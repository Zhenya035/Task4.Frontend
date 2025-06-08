<template>
  <div class="user-list">
    <div class="toolbar">
      <div class="left-side">
        <button @click="blockUsers" class="btn btn-block">
          <img src="../components/block.png" class="bi bi-block" title="block">
          Block
        </button>

        <button @click="unblockUsers" class="btn btn-unblock" title="Unblock">
          <img src="../components/unblock.png" class="bi bi-unlock-fill">
          Unblock
        </button>

        <button @click="deleteUsers" class="btn btn-delete" title="Delete">
          <img src="../components/delete.png" class="bi bi-trash-fill">
          Delete
        </button>
        <input type="text" placeholder="Filter" v-model="filterText" />
      </div>
      <div class="right-side">
        <button @click="logout" class="btn btn-logout">Logout</button>
      </div>
    </div>

    <table class="user-table">
      <thead>
      <tr>
        <th><input type="checkbox" v-model="selectAll" @change="toggleAllSelection" /></th>
        <th>Name</th>
        <th>Email</th>
        <th>Last seen</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in filteredUsers" :key="index">
        <td><input type="checkbox" v-model="user.selected" /></td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ formatLastLogin(user.lastLogin) }}</td>
        <td>{{ user.status }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api/api.js';
import router from "../../router/index.js";

export default {
  data() {
    return {
      users: [],
      filterText: '',
      selectAll: false,
    };
  },
  computed: {
    filteredUsers() {
      const filter = this.filterText.toLowerCase();
      return this.users.filter(user => user.email.toLowerCase().includes(filter));
    }
  },
  methods: {
    toggleAllSelection() {
      this.users.forEach(user => user.selected = this.selectAll);
    },
    async fetchUsers() {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await api.getUsers(userId)
        this.users = response.data.map(user => ({
          ...user,
          selected: false,
        }));
      } catch (error) {
        console.error('Ошибка при получении списка пользователей:', error);

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');

        if(error.response.status === 401) {
          await router.push({path: '/login',
            query: {error: 'unauthorized'}});
        }
        else if(error.response.status === 403) {
          await router.push({path: '/login',
            query: {error: 'blocked'}});
        }

        await router.push('/login');
      }
    },
    formatLastLogin(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();

        const diffInSeconds = Math.floor((now - date) / 1000);

        let relativeTime;

        if (diffInSeconds < 60) {
          relativeTime = `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
        } else {
          const diffInMinutes = Math.floor(diffInSeconds / 60);
          if (diffInMinutes < 60) {
            relativeTime = `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
          } else {
            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
              relativeTime = `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
            } else {
              const diffInDays = Math.floor(diffInHours / 24);
              relativeTime = `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
            }
          }
        }

        const localDate = date.toLocaleString();

        return { relative: relativeTime, full: localDate };
    },
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');

      router.push('/login');
    },
    getSelectedUserIds() {
      return this.users
          .filter(user => user.selected)
          .map(user => user.id);
    },
    async blockUsers() {
      const selectedIds = this.getSelectedUserIds();
      if (selectedIds.length === 0) {
        alert('No users selected.');
        return;
      }

      try {
        await api.blockUsers(selectedIds);
        await this.fetchUsers();
        this.selectAll = false;
      } catch (error) {
        console.error('Error blocking users:', error);
        if(error.response.status === 403) {
          await router.push({path: '/login',
            query: {error: 'incorrect status'}});
        }
        else{
          alert('Failed to block users');
        }
      }
    },
    async unblockUsers() {
      const selectedIds = this.getSelectedUserIds();
      if (selectedIds.length === 0) {
        alert('No users selected.');
        return;
      }

      try {
        await api.unblockUsers(selectedIds);
        await this.fetchUsers();
        this.selectAll = false;
      } catch (error) {
        console.error('Error unblocking users:', error);
        if(error.response.status === 403) {
          await router.push({path: '/login',
            query: {error: 'incorrect status'}});
        }
        else{
          alert('Failed to unblock users');
        }
      }
    },
    async deleteUsers() {
      const selectedIds = this.getSelectedUserIds();
      if (selectedIds.length === 0) {
        alert('No users selected.');
        return;
      }

      try {
        await api.deleteUsers(selectedIds);
        await this.fetchUsers();
        this.selectAll = false;
      } catch (error) {
        console.error('Error deleting users:', error);
        if(error.response.status === 403) {
          await router.push({path: '/login',
            query: {error: 'incorrect status'}});
        }
        else{
          alert('Failed to delete users');
        }
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.user-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn {
  padding: 8px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-block {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.btn-unblock {
  background-color: #e3f2fd;
  color: #0d47a1;
}

.btn-delete {
  background-color: #ffcccc;
  color: #c62828;
}

.btn-logout{
  background-color: #e3f2fd;
  color: #0d47a1;
}

input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.user-table th {
  font-weight: bold;
}

.user-table td input[type="checkbox"] {
  margin-right: 10px;
}

.bi{
  height: 20px;
  width: 20px;
}
</style>