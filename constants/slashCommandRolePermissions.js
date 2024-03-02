// used in slash commands when wanting a per role basis permission system enforced,
// as opposed to discord's baseline permission system that is based on having/not having discord
// permissions

const slashCommandRolePermissions = {
	trusted_role: process.env.TRUSTED_ROLE,
	moderator: process.env.MODERATOR_ROLE,
	admin: process.env.ADMIN_ROLE,
};

module.exports = slashCommandRolePermissions;