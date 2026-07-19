using System.Data;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using BhumiVox.Models;
using BhumiVox.Models.Auth;
using BhumiVox.Models.Master;
using BhumiVox.Models.Journey;
using BhumiVox.Models.Payments;
using BhumiVox.Models.Booking;
using BhumiVox.Services;

namespace BhumiVox.Helper
{
    public class DBUtils
    {
        private readonly string _connectionString;
        private readonly RazorpayService _razorpayService;

        public DBUtils(IConfiguration configuration, RazorpayService razorpayService)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _razorpayService = razorpayService;
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        // 🔹 For SELECT (returns DataTable)
        public DataTable ExecuteDataTable(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            using var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        // 🔹 For INSERT / UPDATE / DELETE
        public int ExecuteNonQuery(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            conn.Open();
            return cmd.ExecuteNonQuery();
        }

        // 🔹 For single value (scalar)
        public object ExecuteScalar(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            conn.Open();
            return cmd.ExecuteScalar();
        }

        // ================================================================================================= [ User Login Starts Here ]
        public UserModel? LoginUser(string email)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_LoginUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Email", email);

            conn.Open();

            using var reader = cmd.ExecuteReader();

            if (!reader.Read())
                return null;

            return new UserModel
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                FullName = reader.GetString(reader.GetOrdinal("FullName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                Phone = reader.IsDBNull(reader.GetOrdinal("Phone"))
                            ? string.Empty
                            : reader.GetString(reader.GetOrdinal("Phone")),
                PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),
                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId")),
                Avatar = reader.IsDBNull(reader.GetOrdinal("Avatar"))
                            ? string.Empty
                            : reader.GetString(reader.GetOrdinal("Avatar")),
                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
            };
        }

        // ================================================================================================= [ User Login Ends Here ]

        // ================================================================================================= [ User Registration Starts Here ]
        public async Task<RegisterResponse> RegisterUserAsync(RegisterRequest request, string createdBy)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_RegisterUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@FullName", request.FullName);
            cmd.Parameters.AddWithValue("@Email", request.Email);
            cmd.Parameters.AddWithValue("@Phone", (object?)request.Phone ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PasswordHash", request.Password);
            cmd.Parameters.AddWithValue("@Avatar", (object?)request.Avatar ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@CreatedBy", createdBy);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                throw new Exception("User registration failed.");

            return new RegisterResponse
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                UserGuid = reader.GetGuid(reader.GetOrdinal("UserGuid")),
                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId"))
            };
        }
        // ================================================================================================= [ User Registration Ends Here ]

        // ================================================================================================= [ User Login Starts Here ]
        public async Task<UserModel?> LoginUserAsync(string email)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_LoginUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", email);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return null;

            return new UserModel
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                FullName = reader.GetString(reader.GetOrdinal("FullName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),

                Phone = reader.IsDBNull(reader.GetOrdinal("Phone"))
                    ? string.Empty
                    : reader.GetString(reader.GetOrdinal("Phone")),

                PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),

                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId")),

                Avatar = reader.IsDBNull(reader.GetOrdinal("Avatar"))
                    ? string.Empty
                    : reader.GetString(reader.GetOrdinal("Avatar")),

                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
            };
        }
        // ================================================================================================= [ User Login Ends Here ]

        // ================================================================================================= [ Get Roles Starts Here Here ]
        public List<RoleModel> GetRoles()
        {
            var roles = new List<RoleModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetRoles", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                roles.Add(new RoleModel
                {
                    RoleId = reader.GetInt32(reader.GetOrdinal("RoleId")),
                    RoleGuid = reader.GetGuid(reader.GetOrdinal("RoleGuid")),
                    RoleName = reader.GetString(reader.GetOrdinal("RoleName"))
                });
            }

            return roles;
        }
        // ================================================================================================= [ Get Roles Ends Here Here ]

        // ================================================================================================= [ Get Destinations Starts Here Here ]
        public async Task<List<DestinationModel>> GetDestinationsAsync()
        {
            var list = new List<DestinationModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetDestinations", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new DestinationModel
                {
                    DestinationId = reader.GetInt32(reader.GetOrdinal("DestinationId")),
                    DestinationGuid = reader.GetGuid(reader.GetOrdinal("DestinationGuid")),
                    DestinationName = reader["DestinationName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    ShortDescription = reader["ShortDescription"]?.ToString(),
                    HeroImage = reader["HeroImage"]?.ToString(),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder")),
                    IsFeatured = reader.GetBoolean(reader.GetOrdinal("IsFeatured")),
                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
                });
            }

            return list;
        }
        // ================================================================================================= [ Get Destinations Ends Here Here ]

        // ================================================================================================= [ Get Destination By Slug Starts Here Here ]
        public async Task<DestinationModel?> GetDestinationBySlugAsync(string slug)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetDestinationBySlug", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Slug", slug);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new DestinationModel
                {
                    DestinationId = reader.GetInt32(reader.GetOrdinal("DestinationId")),
                    DestinationGuid = reader.GetGuid(reader.GetOrdinal("DestinationGuid")),
                    DestinationName = reader["DestinationName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    ShortDescription = reader["ShortDescription"]?.ToString(),
                    LongDescription = reader["LongDescription"]?.ToString(),
                    HeroImage = reader["HeroImage"]?.ToString(),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder")),
                    IsFeatured = reader.GetBoolean(reader.GetOrdinal("IsFeatured")),
                    IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
                };
            }

            return null;
        }
        // ================================================================================================= [ Get Destination By Slug Ends Here Here ]

        // ================================================================================================= [ Create Destination Starts Here Here ]
        public async Task<DestinationResponse> CreateDestinationAsync(CreateDestinationRequest request, string createdBy)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_CreateDestination", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DestinationName", request.DestinationName);
            cmd.Parameters.AddWithValue("@Slug", request.Slug);
            cmd.Parameters.AddWithValue("@ShortDescription", (object?)request.ShortDescription ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@LongDescription", (object?)request.LongDescription ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@HeroImage", (object?)request.HeroImage ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
            cmd.Parameters.AddWithValue("@IsFeatured", request.IsFeatured);
            cmd.Parameters.AddWithValue("@CreatedBy", createdBy);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            await reader.ReadAsync();

            return new DestinationResponse
            {
                DestinationId = reader.GetInt32(reader.GetOrdinal("DestinationId")),
                DestinationGuid = reader.GetGuid(reader.GetOrdinal("DestinationGuid"))
            };
        }
        // ================================================================================================= [ Create Destination Ends Here Here ]

        // ================================================================================================= [ Update Destination Starts Here Here ]
        public async Task UpdateDestinationAsync(int destinationId, CreateDestinationRequest request, string updatedBy)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_UpdateDestination", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DestinationId", destinationId);
            cmd.Parameters.AddWithValue("@DestinationName", request.DestinationName);
            cmd.Parameters.AddWithValue("@Slug", request.Slug);
            cmd.Parameters.AddWithValue("@ShortDescription", (object?)request.ShortDescription ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@LongDescription", (object?)request.LongDescription ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@HeroImage", (object?)request.HeroImage ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@DisplayOrder", request.DisplayOrder);
            cmd.Parameters.AddWithValue("@IsFeatured", request.IsFeatured);
            cmd.Parameters.AddWithValue("@UpdatedBy", updatedBy);

            await conn.OpenAsync();

            await cmd.ExecuteNonQueryAsync();
        }
        // ================================================================================================= [ Update Destination Ends Here Here ]

        // ================================================================================================= [ Delete Destination Starts Here Here ]
        public async Task DeleteDestinationAsync(int destinationId, string updatedBy)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_DeleteDestination", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@DestinationId", destinationId);
            cmd.Parameters.AddWithValue("@UpdatedBy", updatedBy);

            await conn.OpenAsync();

            await cmd.ExecuteNonQueryAsync();
        }
        // ================================================================================================= [ Delete Destination Ends Here Here ]

        // ================================================================================================= [ Get Journey Type Starts Here Here ]
        public List<JourneyTypeModel> GetJourneyTypes()
        {
            var journeyTypes = new List<JourneyTypeModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetJourneyTypes", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                journeyTypes.Add(new JourneyTypeModel
                {
                    JourneyTypeId = reader.GetInt32(reader.GetOrdinal("JourneyTypeId")),
                    JourneyTypeGuid = reader.GetGuid(reader.GetOrdinal("JourneyTypeGuid")),
                    JourneyTypeName = reader.GetString(reader.GetOrdinal("JourneyTypeName")),
                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Description")),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                });
            }

            return journeyTypes;
        }
        // ================================================================================================= [ Get Journey Type Ends Here Here ]

        // ================================================================================================= [ Get Travel Style Starts Here Here ]
        public List<TravelStyleModel> GetTravelStyles()
        {
            var travelStyles = new List<TravelStyleModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetTravelStyles", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                travelStyles.Add(new TravelStyleModel
                {
                    TravelStyleId = reader.GetInt32(reader.GetOrdinal("TravelStyleId")),
                    TravelStyleGuid = reader.GetGuid(reader.GetOrdinal("TravelStyleGuid")),
                    TravelStyleName = reader.GetString(reader.GetOrdinal("TravelStyleName")),
                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                        ? string.Empty
                        : reader.GetString(reader.GetOrdinal("Description")),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                });
            }

            return travelStyles;
        }
        // ================================================================================================= [ Get Travel Style Ends Here Here ]

        // ================================================================================================= [ Get Booking Status Starts Here ]
        public List<BookingStatusModel> GetBookingStatus()
        {
            var bookingStatus = new List<BookingStatusModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetBookingStatus", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                bookingStatus.Add(new BookingStatusModel
                {
                    BookingStatusId = reader.GetInt32(reader.GetOrdinal("BookingStatusId")),
                    BookingStatusGuid = reader.GetGuid(reader.GetOrdinal("BookingStatusGuid")),
                    StatusName = reader.GetString(reader.GetOrdinal("StatusName")),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                });
            }

            return bookingStatus;
        }
        // ================================================================================================= [ Get Booking Status Ends Here ]

        // ================================================================================================= [ Get Payment Status Starts Here ]
        public List<PaymentStatusModel> GetPaymentStatus()
        {
            var paymentStatus = new List<PaymentStatusModel>();

            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_GetPaymentStatus", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            conn.Open();

            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                paymentStatus.Add(new PaymentStatusModel
                {
                    PaymentStatusId = reader.GetInt32(reader.GetOrdinal("PaymentStatusId")),
                    PaymentStatusGuid = reader.GetGuid(reader.GetOrdinal("PaymentStatusGuid")),
                    StatusName = reader.GetString(reader.GetOrdinal("StatusName")),
                    DisplayOrder = reader.GetInt32(reader.GetOrdinal("DisplayOrder"))
                });
            }

            return paymentStatus;
        }
        // ================================================================================================= [ Get Payment Status Ends Here ]

        // ================================================================================================= [ Destination Details Starts Here ]
        public async Task<DestinationDetailsModel?> GetDestinationDetailsAsync(string slug)
        {
            DestinationDetailsModel details = new();

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetDestinationDetails", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Slug", slug);

            await conn.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            // =====================================================
            // Result Set 1 : Destination
            // =====================================================
            if (await reader.ReadAsync())
            {
                details.Destination = new DestinationModel
                {
                    DestinationId = Convert.ToInt32(reader["DestinationId"]),
                    DestinationGuid = Guid.Parse(reader["DestinationGuid"].ToString()!),
                    DestinationName = reader["DestinationName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    ShortDescription = reader["ShortDescription"]?.ToString() ?? "",
                    LongDescription = reader["LongDescription"]?.ToString(),
                    HeroImage = reader["HeroImage"]?.ToString(),
                    Region = reader["Region"]?.ToString(),
                    Tagline = reader["Tagline"]?.ToString(),
                    Circuit = reader["Circuit"]?.ToString(),
                    Significance = reader["Significance"]?.ToString(),
                    Geography = reader["Geography"]?.ToString(),
                    BestTime = reader["BestTime"]?.ToString(),
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"]),
                    IsFeatured = Convert.ToBoolean(reader["IsFeatured"]),
                    IsActive = Convert.ToBoolean(reader["IsActive"])
                };
            }

            // =====================================================
            // Result Set 2 : Gallery
            // =====================================================
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Gallery.Add(new DestinationGalleryModel
                {
                    DestinationGalleryId = Convert.ToInt32(reader["DestinationGalleryId"]),
                    DestinationGalleryGuid = Guid.Parse(reader["DestinationGalleryGuid"].ToString()!),
                    ImageUrl = reader["ImageUrl"].ToString()!,
                    Caption = reader["Caption"]?.ToString(),
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // =====================================================
            // Result Set 3 : Highlights
            // =====================================================
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Highlights.Add(new DestinationHighlightModel
                {
                    DestinationHighlightId = Convert.ToInt32(reader["DestinationHighlightId"]),
                    DestinationHighlightGuid = Guid.Parse(reader["DestinationHighlightGuid"].ToString()!),
                    Highlight = reader["Highlight"].ToString()!,
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // =====================================================
            // Result Set 4 : Related Journeys
            // =====================================================
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.RelatedJourneys.Add(new RelatedJourneyModel
                {
                    JourneyId = Convert.ToInt32(reader["JourneyId"]),
                    JourneyGuid = Guid.Parse(reader["JourneyGuid"].ToString()!),
                    JourneyName = reader["JourneyName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    ShortDescription = reader["ShortDescription"].ToString()!,
                    HeroImage = reader["HeroImage"].ToString()!,
                    Duration = reader["Duration"].ToString()!,
                    PriceFrom = Convert.ToDecimal(reader["PriceFrom"])
                });
            }

            if (details.Destination == null)
                return null;

            return details;
        }
        // ================================================================================================= [ Destination Details Ends Here ]

        // ================================================================================================= [ journey Details Starts Here ]
        public async Task<List<JourneyModel>> GetAllJourneysAsync()
        {
            List<JourneyModel> journeys = new();

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetAllJourneys", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            await conn.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                journeys.Add(new JourneyModel
                {
                    JourneyId = Convert.ToInt32(reader["JourneyId"]),
                    JourneyGuid = Guid.Parse(reader["JourneyGuid"].ToString()!),
                    JourneyName = reader["JourneyName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    DestinationId = Convert.ToInt32(reader["DestinationId"]),
                    DestinationName = reader["DestinationName"].ToString()!,
                    JourneyTypeId = Convert.ToInt32(reader["JourneyTypeId"]),
                    JourneyTypeName = reader["JourneyTypeName"].ToString()!,
                    Duration = reader["Duration"].ToString()!,
                    ShortDescription = reader["ShortDescription"].ToString()!,
                    LongDescription = reader["LongDescription"]?.ToString(),
                    HeroImage = reader["HeroImage"]?.ToString(),
                    PriceFrom = Convert.ToDecimal(reader["PriceFrom"]),
                    IsFeatured = Convert.ToBoolean(reader["IsFeatured"]),
                    IsActive = Convert.ToBoolean(reader["IsActive"])
                });
            }

            return journeys;
        }
        // ================================================================================================= [ journey Details Ends Here ]

        // ================================================================================================= [ journey Slug Details Starts Here ]
        public async Task<JourneyDetailsModel?> GetJourneyDetailsAsync(string slug)
        {
            JourneyDetailsModel details = new();

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetJourneyDetails", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Slug", slug);

            await conn.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            // Result Set 1 - Journey
            if (await reader.ReadAsync())
            {
                details.Journey = new JourneyModel
                {
                    JourneyId = Convert.ToInt32(reader["JourneyId"]),
                    JourneyGuid = Guid.Parse(reader["JourneyGuid"].ToString()!),
                    JourneyName = reader["JourneyName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    DestinationId = Convert.ToInt32(reader["DestinationId"]),
                    DestinationName = reader["DestinationName"].ToString()!,
                    JourneyTypeId = Convert.ToInt32(reader["JourneyTypeId"]),
                    JourneyTypeName = reader["JourneyTypeName"].ToString()!,
                    Duration = reader["Duration"].ToString()!,
                    ShortDescription = reader["ShortDescription"].ToString()!,
                    LongDescription = reader["LongDescription"]?.ToString(),
                    HeroImage = reader["HeroImage"]?.ToString(),
                    PriceFrom = Convert.ToDecimal(reader["PriceFrom"]),
                    IsFeatured = Convert.ToBoolean(reader["IsFeatured"]),
                    IsActive = Convert.ToBoolean(reader["IsActive"])
                };
            }
            else
            {
                return null;
            }

            // Result Set 2 - Itinerary
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Itinerary.Add(new JourneyItineraryModel
                {
                    JourneyItineraryId = Convert.ToInt32(reader["JourneyItineraryId"]),
                    JourneyItineraryGuid = Guid.Parse(reader["JourneyItineraryGuid"].ToString()!),
                    DayNumber = Convert.ToInt32(reader["DayNumber"]),
                    Title = reader["Title"].ToString()!,
                    Description = reader["Description"].ToString()!,
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // Result Set 3 - Inclusions
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Inclusions.Add(new JourneyInclusionModel
                {
                    JourneyInclusionId = Convert.ToInt32(reader["JourneyInclusionId"]),
                    JourneyInclusionGuid = Guid.Parse(reader["JourneyInclusionGuid"].ToString()!),
                    Inclusion = reader["Inclusion"].ToString()!,
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // Result Set 4 - Exclusions
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Exclusions.Add(new JourneyExclusionModel
                {
                    JourneyExclusionId = Convert.ToInt32(reader["JourneyExclusionId"]),
                    JourneyExclusionGuid = Guid.Parse(reader["JourneyExclusionGuid"].ToString()!),
                    Exclusion = reader["Exclusion"].ToString()!,
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // Result Set 5 - FAQs
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.FAQs.Add(new JourneyFAQModel
                {
                    JourneyFAQId = Convert.ToInt32(reader["JourneyFAQId"]),
                    JourneyFAQGuid = Guid.Parse(reader["JourneyFAQGuid"].ToString()!),
                    Question = reader["Question"].ToString()!,
                    Answer = reader["Answer"].ToString()!,
                    DisplayOrder = Convert.ToInt32(reader["DisplayOrder"])
                });
            }

            // Result Set 6 - Destinations
            await reader.NextResultAsync();

            while (await reader.ReadAsync())
            {
                details.Destinations.Add(new JourneyDestinationModel
                {
                    DestinationId = Convert.ToInt32(reader["DestinationId"]),
                    DestinationGuid = Guid.Parse(reader["DestinationGuid"].ToString()!),
                    DestinationName = reader["DestinationName"].ToString()!,
                    Slug = reader["Slug"].ToString()!,
                    HeroImage = reader["HeroImage"].ToString()!
                });
            }

            return details;
        }
        // ================================================================================================= [ journey Slug Details Ends Here ]

        // ================================================================================================= [ Payments Starts Here ]
        public async Task<int> CreateBookingAsync(CreateBookingModel model)
        {
            using SqlConnection conn = new(_connectionString);

            using SqlCommand cmd = new("bv_sp_CreateBooking", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@JourneyId", model.JourneyId);
            cmd.Parameters.AddWithValue("@FullName", model.FullName);
            cmd.Parameters.AddWithValue("@Email", model.Email);
            cmd.Parameters.AddWithValue("@MobileNumber", model.MobileNumber);
            cmd.Parameters.AddWithValue("@Country", (object?)model.Country ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@City", (object?)model.City ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Adults", model.Adults);
            cmd.Parameters.AddWithValue("@Children", model.Children);
            cmd.Parameters.AddWithValue("@PreferredDepartureDate", (object?)model.PreferredDepartureDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@SpecialRequirements", (object?)model.SpecialRequirements ?? DBNull.Value);

            await conn.OpenAsync();

            return Convert.ToInt32(await cmd.ExecuteScalarAsync());
        }
        // ================================================================================================= [ Payments End Here ]

        // ================================================================================================= [ Booking List for Admin Starts Here ]
        public async Task<List<BookingListAdminModel>> GetAllBookingsAsync()
        {
            List<BookingListAdminModel> bookings = new();

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetAllBookings", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            await conn.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                bookings.Add(new BookingListAdminModel
                {
                    BookingGroupId = Convert.ToInt32(reader["BookingGroupId"]),
                    BookingGroupGuid = Guid.Parse(reader["BookingGroupGuid"].ToString()!),

                    BookingId = Convert.ToInt32(reader["BookingId"]),
                    BookingGuid = Guid.Parse(reader["BookingGuid"].ToString()!),

                    JourneyName = reader["JourneyName"].ToString()!,

                    FullName = reader["FullName"].ToString()!,

                    Email = reader["Email"].ToString()!,

                    MobileNumber = reader["MobileNumber"].ToString()!,

                    Country = reader["Country"].ToString()!,

                    City = reader["City"].ToString()!,

                    Adults = Convert.ToInt32(reader["Adults"]),

                    Children = Convert.ToInt32(reader["Children"]),

                    PreferredDepartureDate = Convert.ToDateTime(reader["PreferredDepartureDate"]),

                    SpecialRequirements = reader["SpecialRequirements"]?.ToString(),

                    Amount = reader["Amount"] == DBNull.Value
                ? 0
                : Convert.ToDecimal(reader["Amount"]),

                    Currency = reader["Currency"]?.ToString() ?? "",

                    BookingStatus = reader["BookingStatus"].ToString()!,

                    PaymentStatus = reader["PaymentStatus"].ToString()!,

                    RazorpayPaymentLinkId = reader["RazorpayPaymentLinkId"]?.ToString(),

                    RazorpayShortUrl = reader["RazorpayShortUrl"]?.ToString(),

                    PaymentMethod = reader["PaymentMethod"] == DBNull.Value
                        ? null
                        : reader["PaymentMethod"].ToString(),

                    PaidOn = reader["PaidOn"] == DBNull.Value
                    ? null
                    : Convert.ToDateTime(reader["PaidOn"]),

                    CreatedOn = Convert.ToDateTime(reader["CreatedOn"])
                });
            }

            return bookings;
        }
        // ================================================================================================= [ Booking List for Admin Ends Here ]

        // ================================================================================================= [ Create Booking Starts Here ]
        public async Task<int> CreateBookingAsync(BookingCreateModel model)
        {
            using SqlConnection conn = new(_connectionString);

            using SqlCommand cmd = new("bv_sp_CreateBooking", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            //cmd.Parameters.AddWithValue("@JourneyId", model.JourneyId);
            cmd.Parameters.AddWithValue(
                "@JourneyIds",
                string.Join(",", model.JourneyId)
            );
            cmd.Parameters.AddWithValue("@FullName", model.FullName);
            cmd.Parameters.AddWithValue("@Email", model.Email);
            cmd.Parameters.AddWithValue("@MobileNumber", model.MobileNumber);
            cmd.Parameters.AddWithValue("@Country", model.Country);
            cmd.Parameters.AddWithValue("@City", model.City);
            cmd.Parameters.AddWithValue("@Adults", model.Adults);
            cmd.Parameters.AddWithValue("@Children", model.Children);
            cmd.Parameters.AddWithValue("@PreferredDepartureDate", model.PreferredDepartureDate);

            cmd.Parameters.AddWithValue(
                "@SpecialRequirements",
                string.IsNullOrWhiteSpace(model.SpecialRequirements)
                    ? DBNull.Value
                    : model.SpecialRequirements
            );

            await conn.OpenAsync();

            return Convert.ToInt32(await cmd.ExecuteScalarAsync());
        }
        // ================================================================================================= [ Create Booking Ends Here ]

        // ================================================================================================= [ My Booking List Starts Here ]
        public async Task<List<MyBookingModel>> GetBookingsByEmailAsync(string email)
        {
            List<MyBookingModel> bookings = new();

            using SqlConnection con = new SqlConnection(_connectionString);

            using SqlCommand cmd = new SqlCommand(
                "bv_sp_GetBookingsByEmail",
                con);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Email", email);

            await con.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                bookings.Add(new MyBookingModel
                {
                    BookingGroupId = Convert.ToInt32(reader["BookingGroupId"]),
                    BookingGroupGuid = Guid.Parse(reader["BookingGroupGuid"].ToString()!),
                    BookingId = Convert.ToInt32(reader["BookingId"]),
                    BookingGuid = Guid.Parse(reader["BookingGuid"].ToString()!),

                    JourneyName = reader["JourneyName"].ToString()!,

                    FullName = reader["FullName"].ToString()!,
                    Email = reader["Email"].ToString()!,
                    MobileNumber = reader["MobileNumber"].ToString()!,

                    Country = reader["Country"].ToString()!,
                    City = reader["City"].ToString()!,

                    Adults = Convert.ToInt32(reader["Adults"]),
                    Children = Convert.ToInt32(reader["Children"]),

                    PreferredDepartureDate =
                        Convert.ToDateTime(reader["PreferredDepartureDate"]),

                    SpecialRequirements =
                        reader["SpecialRequirements"]?.ToString(),

                    Amount =
                        Convert.ToDecimal(reader["Amount"]),

                    Currency =
                        reader["Currency"].ToString()!,

                    BookingStatus =
                        reader["BookingStatus"].ToString()!,

                    PaymentStatus =
                        reader["PaymentStatus"].ToString()!,

                    RazorpayPaymentLinkId =
                        reader["RazorpayPaymentLinkId"] == DBNull.Value
                            ? null
                            : reader["RazorpayPaymentLinkId"].ToString(),

                    RazorpayShortUrl =
                        reader["RazorpayShortUrl"] == DBNull.Value
                            ? null
                            : reader["RazorpayShortUrl"].ToString(),

                    CreatedOn =
                        Convert.ToDateTime(reader["CreatedOn"])
                });
            }

            return bookings;
        }
        // ================================================================================================= [ My Booking List Ends Here ]

        // ================================================================================================= [ Payment Process Starts Here ]
        public async Task<BookingModel?> GetBookingByIdAsync(int bookingId)
        {
            BookingModel? booking = null;

            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetBookingById", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BookingId", bookingId);

            await conn.OpenAsync();

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                booking = new BookingModel
                {
                    BookingId = Convert.ToInt32(reader["BookingId"]),
                    BookingGuid = Guid.Parse(reader["BookingGuid"].ToString()!),

                    JourneyId = Convert.ToInt32(reader["JourneyId"]),
                    JourneyName = reader["JourneyName"].ToString()!,

                    FullName = reader["FullName"].ToString()!,
                    Email = reader["Email"].ToString()!,
                    MobileNumber = reader["MobileNumber"].ToString()!,

                    Country = reader["Country"].ToString()!,
                    City = reader["City"].ToString()!,

                    Adults = Convert.ToInt32(reader["Adults"]),
                    Children = Convert.ToInt32(reader["Children"]),

                    PreferredDepartureDate =
                        Convert.ToDateTime(reader["PreferredDepartureDate"]),

                    SpecialRequirements =
                        reader["SpecialRequirements"]?.ToString(),

                    BookingStatus = reader["BookingStatus"].ToString()!,
                    PaymentStatus = reader["PaymentStatus"].ToString()!,

                    Amount = Convert.ToDecimal(reader["Amount"]),

                    PaymentLink =
                        reader["PaymentLink"] == DBNull.Value
                            ? null
                            : reader["PaymentLink"].ToString(),

                    CreatedOn =
                        Convert.ToDateTime(reader["CreatedOn"])
                };
            }

            return booking;
        }

        public async Task<object> GeneratePaymentLinkAsync(int bookingId, decimal amount)
        {
            using SqlConnection conn = new(_connectionString);

            await conn.OpenAsync();

            using SqlCommand cmd = new("bv_sp_GetBookingForPaymentLink", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@BookingId", bookingId);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                throw new Exception("Booking not found.");

            string customerName = reader["FullName"].ToString()!;
            string email = reader["Email"].ToString()!;
            string mobile = reader["MobileNumber"].ToString()!;
            string journeyName = reader["JourneyName"].ToString()!;

            //decimal amount = Convert.ToDecimal(reader["Amount"]);

            await reader.CloseAsync();

            using SqlCommand updateCmd = new SqlCommand(@"UPDATE bv_Bookings SET Amount = @Amount WHERE BookingId = @BookingId", conn);

            updateCmd.Parameters.AddWithValue("@BookingId", bookingId);
            updateCmd.Parameters.AddWithValue("@Amount", amount);

            await updateCmd.ExecuteNonQueryAsync();

            //------------------------------------------
            // Call Razorpay
            //------------------------------------------

            var request = new RazorpayPaymentLinkRequest
            {
                amount = (int)(amount * 100), // Razorpay expects amount in paise
                currency = "INR",
                reference_id = $"BV_{bookingId}_{DateTime.UtcNow:yyyyMMddHHmmss}",
                description = journeyName,

                customer = new Customer
                {
                    name = customerName,
                    email = email,
                    contact = mobile
                },

                notify = new Notify
                {
                    sms = true,
                    email = true
                },

                reminder_enable = true
            };

            var razorpay = await _razorpayService.CreatePaymentLinkAsync(request);

            //------------------------------------------
            // Save Payment Link
            //------------------------------------------

            using SqlCommand saveCmd = new("bv_sp_SavePaymentLink", conn);

            saveCmd.CommandType = CommandType.StoredProcedure;

            saveCmd.Parameters.AddWithValue("@BookingId", bookingId);

            saveCmd.Parameters.AddWithValue(
                "@RazorpayPaymentLinkId",
                razorpay.id
            );

            saveCmd.Parameters.AddWithValue(
                "@RazorpayShortUrl",
                razorpay.short_url
            );

            saveCmd.Parameters.AddWithValue(
                "@Amount",
                amount
            );

            saveCmd.Parameters.AddWithValue(
                "@Currency",
                razorpay.currency
            );

            saveCmd.Parameters.AddWithValue(
                "@LinkStatus",
                razorpay.status
            );

            if (razorpay.expire_by > 0)
            {
                saveCmd.Parameters.AddWithValue(
                    "@ExpireBy",
                    DateTimeOffset
                        .FromUnixTimeSeconds(razorpay.expire_by)
                        .DateTime
                );
            }
            else
            {
                saveCmd.Parameters.AddWithValue(
                    "@ExpireBy",
                    DBNull.Value
                );
            }

            await saveCmd.ExecuteNonQueryAsync();

            //------------------------------------------
            // Return to Controller
            //------------------------------------------

            return new
            {
                RazorpayPaymentLinkId = razorpay.id,
                RazorpayShortUrl = razorpay.short_url,
                Currency = razorpay.currency,
                Amount = amount,
                Status = razorpay.status
            };
        }

        public async Task MarkBookingPaidAsync(int bookingId)
        {
            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_MarkBookingPaid", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BookingId", bookingId);

            await conn.OpenAsync();
            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<string?> GetPaymentLinkAsync(int bookingId)
        {
            using SqlConnection conn = new(_connectionString);
            using SqlCommand cmd = new("bv_sp_GetPaymentLink", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BookingId", bookingId);

            await conn.OpenAsync();

            object? result = await cmd.ExecuteScalarAsync();

            if (result == null || result == DBNull.Value)
                return null;

            return result.ToString();
        }
        // ================================================================================================= [ Payment Process Ends Here ]

        // ================================================================================================= [ Payment Stats Starts Here ]
        public async Task SaveSuccessfulPaymentAsync(string razorpayPaymentLinkId, string razorpayPaymentId, string razorpayOrderId, decimal amountPaid, 
            string paymentStatus, string paymentMethod, string razorpayResponse)
        {
            try
            {
                Console.WriteLine("SP Started");

                using SqlConnection conn = new(_connectionString);

                using SqlCommand cmd =
                    new("bv_sp_SaveSuccessfulPayment", conn);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@RazorpayPaymentLinkId", razorpayPaymentLinkId);
                cmd.Parameters.AddWithValue("@RazorpayPaymentId", razorpayPaymentId);
                cmd.Parameters.AddWithValue("@RazorpayOrderId", razorpayOrderId);
                cmd.Parameters.AddWithValue("@AmountPaid", amountPaid);
                cmd.Parameters.AddWithValue("@PaymentStatus", paymentStatus);
                cmd.Parameters.AddWithValue("@PaymentMethod", paymentMethod);
                cmd.Parameters.AddWithValue("@RazorpayResponse", razorpayResponse);

                await conn.OpenAsync();

                await cmd.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
        // ================================================================================================= [ Payment Stats Ends Here ]
    }
}