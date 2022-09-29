<template>
  <todo-card title="すべてのタスク" :todo-list="todoList" />
  <todo-card title="完了済みタスク" :todo-list="completedTodoList" />
  <todo-card title="未完了タスク" :todo-list="inCompletedTodoList" />
</template>

<script>
import TodoCard from "./TodoCard.vue";
export default {
  name: "ToDo",
  components: {
    TodoCard,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      todoList: [
        { title: "牛乳買ってくる", status: false },
        { title: "髪切る", status: false },
        { title: "ゴミを捨てる", status: false },
      ],
    };
  },
  computed: {
    completedTodoList() {
      return this.todoList.filter((item) => item.status);
    },
    inCompletedTodoList() {
      return this.todoList.filter((item) => !item.status);
    },
  },
  methods: {
    deleteTodo(targetIndex) {
      this.todoList = this.todoList.filter((_item, index) => {
        return index !== targetIndex;
      });
    },
  },
};
</script>

<style scoped>
.card + .card {
  margin-top: 20px;
}
</style>
