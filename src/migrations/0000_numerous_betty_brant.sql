CREATE TABLE `Addresses` (
	`AddressId` text PRIMARY KEY NOT NULL,
	`Address1` text NOT NULL,
	`Address2` text,
	`City` text NOT NULL,
	`StateCode` text,
	`ZipCode` text,
	`CountryCode` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `Assignments` (
	`AssignmentId` text PRIMARY KEY NOT NULL,
	`AuthorizationId` text NOT NULL,
	`CommunityId` text NOT NULL,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AuthorizationId`) REFERENCES `Authorizations`(`AuthorizationId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`CommunityId`) REFERENCES `Communities`(`CommunityId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Authorizations` (
	`AuthorizationId` text PRIMARY KEY NOT NULL,
	`ContactId` text NOT NULL,
	`RoleId` text NOT NULL,
	`OperatingCompanyId` text NOT NULL,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`ContactId`) REFERENCES `Contacts`(`ContactId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`RoleId`) REFERENCES `Roles`(`RoleId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`OperatingCompanyId`) REFERENCES `OperatingCompanies`(`OperatingCompanyId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Communities` (
	`CommunityId` text PRIMARY KEY NOT NULL,
	`CommunityName` text,
	`ShortName` text,
	`Abbreviation` text,
	`AddressId` text,
	`DivisionId` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`DivisionId`) REFERENCES `Divisions`(`DivisionId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ContactTypes` (
	`ContactTypeId` text PRIMARY KEY NOT NULL,
	`ContactTypeName` text,
	`ContactTypeDescription` text,
	`Ranking` integer,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `Contacts` (
	`ContactId` text PRIMARY KEY NOT NULL,
	`PersonId` text,
	`GroupId` text,
	`ContactTypeId` text,
	`EmailAddress` text NOT NULL,
	`FirstName` text NOT NULL,
	`LastName` text NOT NULL,
	`Title` text,
	`ExternalContactIdentifier` text,
	`IsBoardMember` integer,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`PersonId`) REFERENCES `Persons`(`PersonId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`GroupId`) REFERENCES `Groups`(`GroupId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ContactTypeId`) REFERENCES `ContactTypes`(`ContactTypeId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Divisions` (
	`DivisionId` text PRIMARY KEY NOT NULL,
	`DivisionName` text,
	`ShortName` text,
	`Abbreviation` text,
	`AddressId` text,
	`OperatingCompanyId` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`OperatingCompanyId`) REFERENCES `OperatingCompanies`(`OperatingCompanyId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Groups` (
	`GroupId` text PRIMARY KEY NOT NULL,
	`GroupName` text,
	`ShortName` text,
	`Abbreviation` text,
	`AddressId` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Invoices` (
	`InvoiceId` text PRIMARY KEY NOT NULL,
	`PaymentTypeId` text NOT NULL,
	`CommunityId` text NOT NULL,
	`VendorId` text NOT NULL,
	`InvoiceName` text NOT NULL,
	`InvoiceNumber` text NOT NULL,
	`InvoiceAmount` text NOT NULL,
	`ReceivedDate` text NOT NULL,
	`DueDate` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`PaymentTypeId`) REFERENCES `PaymentTypes`(`PaymentTypeId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`CommunityId`) REFERENCES `Communities`(`CommunityId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`VendorId`) REFERENCES `Vendors`(`VendorId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Locations` (
	`LocationId` text NOT NULL,
	`LocationName` text NOT NULL,
	`AddressId` text NOT NULL,
	`VendorId` text NOT NULL,
	`OfficePhone` text,
	`MobilePhone` text,
	`Fax` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	PRIMARY KEY(`AddressId`, `VendorId`),
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`VendorId`) REFERENCES `Vendors`(`VendorId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `OperatingCompanies` (
	`OperatingCompanyId` text PRIMARY KEY NOT NULL,
	`OperatingCompanyName` text,
	`ShortName` text,
	`Abbreviation` text,
	`AddressId` text,
	`RegionId` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`RegionId`) REFERENCES `Regions`(`RegionId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PaymentTypes` (
	`PaymentTypeId` text PRIMARY KEY NOT NULL,
	`PaymentTypeName` text,
	`PaymentTypeDescription` text,
	`Ranking` integer,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `Persons` (
	`PersonId` text PRIMARY KEY NOT NULL,
	`EmailAddress` text NOT NULL,
	`FirstName` text NOT NULL,
	`LastName` text NOT NULL,
	`Title` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `PropertyTypes` (
	`PropertyTypeId` text PRIMARY KEY NOT NULL,
	`PropertyTypeName` text,
	`PropertyTypeDescription` text,
	`Ranking` integer,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `Regions` (
	`RegionId` text PRIMARY KEY NOT NULL,
	`RegionName` text,
	`ShortName` text,
	`Abbreviation` text,
	`AddressId` text,
	`GroupId` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`GroupId`) REFERENCES `Groups`(`GroupId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Roles` (
	`RoleId` text PRIMARY KEY NOT NULL,
	`RoleName` text NOT NULL,
	`RoleDescription` text NOT NULL,
	`Ranking` integer,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`UserId` text PRIMARY KEY NOT NULL,
	`PersonId` text NOT NULL,
	`AuthenticationIdentifier` text NOT NULL,
	`InternalAdministrator` integer DEFAULT false NOT NULL,
	`AcceptedTermsDate` text,
	`AcceptedTermsVersion` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`PersonId`) REFERENCES `Persons`(`PersonId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Vendors` (
	`VendorId` text PRIMARY KEY NOT NULL,
	`vendorNumber` text NOT NULL,
	`VendorType` text NOT NULL,
	`AddressId` text,
	`VendorName` text NOT NULL,
	`OfficePhone` text,
	`MobilePhone` text,
	`Fax` text,
	`FederalID` text NOT NULL,
	`AlternateName` text,
	`AlternateNameType` text,
	`CreatedDate` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CreatedBy` text NOT NULL,
	`DeactivatedDate` text,
	`DeactivatedBy` text,
	`DeletedDate` text,
	`DeletedBy` text,
	FOREIGN KEY (`AddressId`) REFERENCES `Addresses`(`AddressId`) ON UPDATE no action ON DELETE no action
);
