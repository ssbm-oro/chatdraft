BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserPreference] ADD [bgOpacity] INT NOT NULL CONSTRAINT [UserPreference_bgOpacity_df] DEFAULT 70;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH