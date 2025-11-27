using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gptgigapi.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                IF OBJECT_ID(N'[Orders]', 'U') IS NULL
                BEGIN
                    CREATE TABLE [Orders] (
                        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
                        [Amount] DECIMAL(18,2) NOT NULL,
                        [Currency] NVARCHAR(10) NOT NULL,
                        [PaymentIntentId] NVARCHAR(MAX) NOT NULL,
                        [PaymentMethodType] NVARCHAR(MAX) NULL,
                        [PaymentStatus] NVARCHAR(MAX) NOT NULL,
                        [CustomerName] NVARCHAR(MAX) NULL,
                        [CustomerEmail] NVARCHAR(MAX) NULL,
                        [ScheduledSlot] NVARCHAR(MAX) NULL,
                        [CreatedAt] DATETIME2 NOT NULL,
                        [TenantId] NVARCHAR(MAX) NOT NULL
                    );
                END
            ");

            migrationBuilder.Sql(@"
                IF OBJECT_ID(N'[Orders]', 'U') IS NOT NULL AND COL_LENGTH('Orders', 'ServiceImageUrl') IS NOT NULL
                    ALTER TABLE [Orders] DROP COLUMN [ServiceImageUrl];
            ");

            migrationBuilder.Sql(@"
                IF OBJECT_ID(N'[Orders]', 'U') IS NOT NULL AND COL_LENGTH('Orders', 'ServiceItemId') IS NOT NULL
                    ALTER TABLE [Orders] DROP COLUMN [ServiceItemId];
            ");

            migrationBuilder.Sql(@"
                IF OBJECT_ID(N'[Orders]', 'U') IS NOT NULL AND COL_LENGTH('Orders', 'ServiceTitle') IS NOT NULL
                    ALTER TABLE [Orders] DROP COLUMN [ServiceTitle];
            ");

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServiceItemId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    TenantId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.AddColumn<string>(
                name: "ServiceImageUrl",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ServiceItemId",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ServiceTitle",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
