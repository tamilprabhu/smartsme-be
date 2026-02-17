/**
 * Attaches audit hooks to a Sequelize model
 * Automatically sets createdBy, updatedBy, createdAt, updatedAt (UTC)
 * based on context passed in options
 */
function attachAuditHooks(model) {
  model.beforeCreate((instance, options) => {
    const now = new Date();
    if (options.context?.actor) {
      instance.createdBy = options.context.actor.userId;
      instance.updatedBy = options.context.actor.userId;
    }
    instance.createdAt = now;
    instance.updatedAt = now;
  });

  model.beforeUpdate((instance, options) => {
    const now = new Date();
    if (options.context?.actor) {
      instance.updatedBy = options.context.actor.userId;
    }
    instance.updatedAt = now;
  });

  model.beforeBulkUpdate((options) => {
    const now = new Date();
    if (options.context?.actor && options.attributes) {
      options.attributes.updatedBy = options.context.actor.userId;
    }
    options.attributes.updatedAt = now;
  });
}

module.exports = { attachAuditHooks };
