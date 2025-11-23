using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gptgigapi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveVendorFromCustomerProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerProfiles_VendorProfiles_VendorProfileId",
                table: "CustomerProfiles");

            migrationBuilder.DropIndex(
                name: "IX_CustomerProfiles_VendorProfileId",
                table: "CustomerProfiles");

            migrationBuilder.DropColumn(
                name: "VendorProfileId",
                table: "CustomerProfiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VendorProfileId",
                table: "CustomerProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerProfiles_VendorProfileId",
                table: "CustomerProfiles",
                column: "VendorProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerProfiles_VendorProfiles_VendorProfileId",
                table: "CustomerProfiles",
                column: "VendorProfileId",
                principalTable: "VendorProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
