<template>
  <div class="flex flex-col items-center justify-center min-w-fit space-y-4 p-4">
  <form @submit.prevent="addTodo" class="flex flex-col items-center">
    <base-input :value="newTodo" @input="updateNewTodo" :error="error"
                :valid="isInputValid"></base-input>
    <base-button :disabled="disabled || tooManyTodos || error || !isInputValid" css-class="solid"> Add ToDo
    </base-button>
  </form>
  <div v-if="tooManyTodos">
    <p>Too much todos! Complete or delete at least one todo to re-enable the button.</p>
  </div>
  <div class="todolist flex flex-col w-1/3 items-center">
    <div class="flex flex-row flex-wrap items-center justify-center p-2 space-x-1">
      <base-button css-class="solid" @click="showAll">All</base-button>
      <base-button css-class="solid" @click="showActive">Active</base-button>
      <base-button css-class="solid" @click="showCompleted" class="spacing">Completed</base-button>
    </div>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id"
          class="pl-4 flex flex-row justify-center items-center space-x-3 p-2">
        <span :class="{ completed: todo.completed}"> {{ todo.text }} </span>
        <base-check-box :completed="todo.completed" @update:completed="todo.completed = $event"></base-check-box>
        <base-button :disabled="disabled" css-class="outline" @click="removeTodo(todo)">x</base-button>
      </li>
    </ul>

    <div class="flex flex-row justify-center mt-4 p-2 border-2 w-32 h-8 items-center">
      {{ activeTodosCount }} toDos left
    </div>
  </div>
  </div>
</template>

<script>


import BaseCheckBox from "../components/BaseCheckBox.vue";
import BaseButton from "../components/BaseButton.vue";

let id = 0

export default {
  name: "TodoList",
  components: {
    BaseCheckBox,
    BaseButton
  },
  data() {
    return {
      newTodo: '',
      filter: 'all',
      maxTodos: 10,
      disabled: false,
      error: false,
      todos: [
        {id: id++, text: 'Shopping'},
        {id: id++, text: 'Football'},
        {id: id++, text: 'Say Hi'}
      ],
    }
  },
  mounted() {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos)
    }
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') {
        this.error = true;
        return;
      }
      this.todos.push({id: id++, text: this.newTodo, completed: false})
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.newTodo = ''
      this.error = false;
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    showAll() {
      this.filter = 'all';
    },
    showActive() {
      this.filter = 'active';
    },
    showCompleted() {
      this.filter = 'completed';
    },
    updateNewTodo(value) {
      this.newTodo = value;
      this.error = false;
    }
  },

  computed: {
    activeTodosCount() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.todos.filter(todo => todo.completed);
        default:
          return this.todos;
      }
    },
    tooManyTodos() {
      return this.activeTodosCount >= this.maxTodos
    },
    isInputValid() {
      return this.newTodo.trim() !== '';
    }
  }
}
</script>

<style scoped>
.completed {
  @apply line-through;
}

@media (max-width: 592px ) {
  .spacing {
    margin-top: 7px;
  }
}
</style>