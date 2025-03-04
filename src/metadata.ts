/* eslint-disable */
export default async () => {
    const t = {
        ["./entities/task.entity"]: await import("./entities/task.entity"),
        ["./entities/user.entity"]: await import("./entities/user.entity"),
        ["./entities/project.entity"]: await import("./entities/project.entity"),
        ["./entities/role.entity"]: await import("./entities/role.entity"),
        ["./entities/organization.entity"]: await import("./entities/organization.entity"),
        ["./entities/permission.entity"]: await import("./entities/permission.entity"),
        ["./entities/milestone.entity"]: await import("./entities/milestone.entity"),
        ["./entities/expense.entity"]: await import("./entities/expense.entity"),
        ["./entities/comment.entity"]: await import("./entities/comment.entity"),
        ["./entities/attachment.entity"]: await import("./entities/attachment.entity"),
        ["./modules/roles/dto/get-role-res.dto"]: await import("./modules/roles/dto/get-role-res.dto"),
        ["./modules/auth/dto/sign-up.dto"]: await import("./modules/auth/dto/sign-up.dto"),
        ["./modules/auth/dto/sign-in.dto"]: await import("./modules/auth/dto/sign-in.dto"),
        ["./modules/roles/dto/get-list-role-res.dto"]: await import("./modules/roles/dto/get-list-role-res.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/attachments/dto/create-attachment.dto"), { "CreateAttachmentDto": {} }], [import("./modules/attachments/dto/update-attachment.dto"), { "UpdateAttachmentDto": {} }], [import("./entities/base.entity"), { "BaseEntity": { id: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } } }], [import("./entities/comment.entity"), { "Comment": { content: { required: true, type: () => String }, taskId: { required: true, type: () => String }, userId: { required: true, type: () => String }, task: { required: true, type: () => t["./entities/task.entity"].Task }, user: { required: true, type: () => t["./entities/user.entity"].User } } }], [import("./entities/expense.entity"), { "Expense": { description: { required: true, type: () => String }, amount: { required: true, type: () => Number }, date: { required: true, type: () => Date }, projectId: { required: true, type: () => String }, project: { required: true, type: () => t["./entities/project.entity"].Project } } }], [import("./entities/permission.entity"), { "Permission": { name: { required: true, type: () => String }, description: { required: true, type: () => Object }, roles: { required: true, type: () => [t["./entities/role.entity"].Role] } } }], [import("./entities/role.entity"), { "Role": { name: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => t["./entities/organization.entity"].Organization }, permissions: { required: true, type: () => [t["./entities/permission.entity"].Permission] }, users: { required: true, type: () => [t["./entities/user.entity"].User] } } }], [import("./entities/organization.entity"), { "Organization": { name: { required: true, type: () => String }, defaultRoleId: { required: true, type: () => Object }, users: { required: true, type: () => [t["./entities/user.entity"].User] }, roles: { required: true, type: () => [t["./entities/role.entity"].Role] }, projects: { required: true, type: () => [t["./entities/project.entity"].Project] }, defaultRole: { required: true, type: () => Object } } }], [import("./entities/project.entity"), { "Project": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, startDate: { required: true, type: () => Date }, endDate: { required: true, type: () => Date }, budget: { required: true, type: () => Number }, status: { required: true, type: () => String }, organizationId: { required: true, type: () => String }, organization: { required: true, type: () => t["./entities/organization.entity"].Organization }, milestones: { required: true, type: () => [t["./entities/milestone.entity"].Milestone] }, expenses: { required: true, type: () => [t["./entities/expense.entity"].Expense] } } }], [import("./entities/milestone.entity"), { "Milestone": { name: { required: true, type: () => String }, dueDate: { required: true, type: () => Date }, status: { required: true, type: () => String }, projectId: { required: true, type: () => String }, project: { required: true, type: () => t["./entities/project.entity"].Project }, tasks: { required: true, type: () => [t["./entities/task.entity"].Task] } } }], [import("./entities/task.entity"), { "Task": { name: { required: true, type: () => String }, description: { required: true, type: () => Object }, dueDate: { required: true, type: () => Date }, status: { required: true, type: () => String }, milestoneId: { required: true, type: () => String }, assignedToId: { required: true, type: () => Object }, dependsOnId: { required: true, type: () => Object }, milestone: { required: true, type: () => t["./entities/milestone.entity"].Milestone }, assignedTo: { required: true, type: () => Object }, dependsOn: { required: true, type: () => Object }, comments: { required: true, type: () => [t["./entities/comment.entity"].Comment] }, attachments: { required: true, type: () => [t["./entities/attachment.entity"].Attachment] } } }], [import("./entities/attachment.entity"), { "Attachment": { fileUrl: { required: true, type: () => String }, taskId: { required: true, type: () => String }, uploadedById: { required: true, type: () => String }, task: { required: true, type: () => t["./entities/task.entity"].Task }, uploadedBy: { required: true, type: () => t["./entities/user.entity"].User } } }], [import("./entities/user.entity"), { "User": { email: { required: true, type: () => String }, password: { required: true, type: () => String }, organizationId: { required: true, type: () => Object }, roleId: { required: true, type: () => Object }, comments: { required: true, type: () => [t["./entities/comment.entity"].Comment] }, tasks: { required: true, type: () => [t["./entities/task.entity"].Task] }, attachments: { required: true, type: () => [t["./entities/attachment.entity"].Attachment] }, organization: { required: true, type: () => Object }, role: { required: true, type: () => Object } } }], [import("./modules/auth/dto/sign-in.dto"), { "SignInDto": { email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8 } }, "SignInResDto": { accessToken: { required: true, type: () => String } } }], [import("./modules/auth/dto/sign-up.dto"), { "SignUpDto": { email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8 } }, "SignUpResDto": { accessToken: { required: true, type: () => String } } }], [import("./modules/comments/dto/create-comment.dto"), { "CreateCommentDto": {} }], [import("./modules/comments/dto/update-comment.dto"), { "UpdateCommentDto": {} }], [import("./modules/expenses/dto/create-expense.dto"), { "CreateExpenseDto": {} }], [import("./modules/expenses/dto/update-expense.dto"), { "UpdateExpenseDto": {} }], [import("./modules/milestones/dto/create-milestone.dto"), { "CreateMilestoneDto": {} }], [import("./modules/milestones/dto/update-milestone.dto"), { "UpdateMilestoneDto": {} }], [import("./modules/organizations/dto/create-organization.dto"), { "CreateOrganizationDto": {} }], [import("./modules/organizations/dto/update-organization.dto"), { "UpdateOrganizationDto": {} }], [import("./modules/permissions/dto/create-permission.dto"), { "CreatePermissionDto": {} }], [import("./modules/permissions/dto/update-permission.dto"), { "UpdatePermissionDto": {} }], [import("./modules/projects/dto/create-project.dto"), { "CreateProjectDto": {} }], [import("./modules/projects/dto/update-project.dto"), { "UpdateProjectDto": {} }], [import("./modules/roles/dto/create-role.dto"), { "CreateRoleDto": { name: { required: true, type: () => String }, description: { required: false, type: () => String }, permissionIds: { required: true, type: () => [String] } } }], [import("./modules/roles/dto/get-role-res.dto"), { "GetRoleResDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => Object }, permissions: { required: true, type: () => [String] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } } }], [import("./modules/roles/dto/get-list-role-res.dto"), { "GetListRoleResDto": { items: { required: true, type: () => [t["./modules/roles/dto/get-role-res.dto"].GetRoleResDto] } } }], [import("./modules/roles/dto/update-role.dto"), { "UpdateRoleDto": {} }], [import("./modules/tasks/dto/create-task.dto"), { "CreateTaskDto": {} }], [import("./modules/tasks/dto/update-task.dto"), { "UpdateTaskDto": {} }], [import("./modules/users/dto/create-user.dto"), { "CreateUserDto": {} }], [import("./modules/users/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./modules/permissions/dto/permission-res.dto"), { "PermissionResDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => Object }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } } }], [import("./modules/roles/dto/get-list-role.dto"), { "GetListRoleQueryDto": { organizationId: { required: false, type: () => String, format: "uuid" } } }]], "controllers": [[import("./modules/attachments/attachments.controller"), { "AttachmentsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/auth/auth.controller"), { "AuthController": { "signUp": { type: t["./modules/auth/dto/sign-up.dto"].SignUpResDto }, "signIn": { type: t["./modules/auth/dto/sign-in.dto"].SignInResDto } } }], [import("./modules/comments/comments.controller"), { "CommentsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/expenses/expenses.controller"), { "ExpensesController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/milestones/milestones.controller"), { "MilestonesController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/organizations/organizations.controller"), { "OrganizationsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/permissions/permissions.controller"), { "PermissionsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/projects/projects.controller"), { "ProjectsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/roles/roles.controller"), { "RolesController": { "create": { type: String }, "findAll": { type: t["./modules/roles/dto/get-list-role-res.dto"].GetListRoleResDto }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }], [import("./modules/tasks/tasks.controller"), { "TasksController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }], [import("./modules/users/users.controller"), { "UsersController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};