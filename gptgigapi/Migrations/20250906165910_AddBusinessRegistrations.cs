using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gptgigapi.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessRegistrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BusinessRegistrations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Structure = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EIN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Licenses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Taxes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Insurance = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Operations = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TenantId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BusinessRegistrations", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BusinessRegistrations");
        }
    }
}
