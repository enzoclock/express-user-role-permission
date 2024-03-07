// Any database system would work for these tables.

const { USERS, ROLES, PERMISSIONS, USER_ROLES, ROLE_PERMISSIONS } = createFakeDatabase();

export default {
  getUserByApiKey,
  getUserPermissionNames
};


function createFakeDatabase() {
  const USERS = {
    1: { id: 1, name: "Alice" },
    2: { id: 2, name: "Bob" },
    3: { id: 3, name: "Charly" },
    4: { id: 4, name: "David" },
    5: { id: 5, name: "Enzo" }
  };

  const ROLES = {
    1: { name: "pizzaiolo" },
    2: { name: "delivery" },
    3: { name: "waiter" }
  };

  const PERMISSIONS = {
    1: { name: "pizza:create" },
    2: { name: "pizza:delete" },
    3: { name: "pizza:add-ingredient" },
    4: { name: "order:create" },
    5: { name: "order:update" },
    6: { name: "order:delete" },
    7: { name: "deliver" },
    8: { name: "call"},
    9: { name: "kitchen:clean" }
  }

  const USER_ROLES = {
    1: { userId: 1, roleIds: [1] },    // Alice is a pizzaiolo
    2: { userId: 2, roleIds: [3] },    // Bob is a waiter
    3: { userId: 3, roleIds: [2] },    // Charly is a delivery man
    4: { userId: 4, roleIds: [1, 3] }, // David is both a pizzaiolo and a waiter
    5: { userId: 5, roleIds: [2, 3] }  // Enzo is both a delivery man and a waiter
  };
  // Alternatively, create multiple entries instead of having roleIds been an array

  const ROLE_PERMISSIONS = {
    1: { roleId: 1, permissionIds: [1, 2, 3, 4, 9] },       // A pizzaiolo can do pizza stuff, create an order and clean the kitchen
    2: { roleId: 2, permissionIds: [6, 7, 8, 9] },          // A delivery person can delete an order, deliver the pizza, call the person, and clean the kitchen
    3: { roleId: 3, permissionIds: [2, 3, 4, 5, 6, 8, 9] }  // A waiter can do pizza related stuff (not all), order related stuff (all), and more...
  };
  // Alternatively, create multiple entries instead of having permissionIds been an array

  return { USERS, ROLES, PERMISSIONS, USER_ROLES, ROLE_PERMISSIONS };
}


function getUserByApiKey(apiKey) {
  return USERS[apiKey];
}

function getUserPermissionNames(userId) {
  const userRoleIds = USER_ROLES[userId].roleIds;
  const userPermissionIds = userRoleIds.map(roleId => ROLE_PERMISSIONS[roleId].permissionIds).flat();
  const permissionNames = userPermissionIds.map(permissionId => PERMISSIONS[permissionId].name);
  return permissionNames;
}
