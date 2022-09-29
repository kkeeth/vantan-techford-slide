<template>
  <div class="todo">
    <h1>This is an TODO page</h1>
    <todo />
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";

export default {
  name: "TodoView",
  components: {
    Todo,
  },
};
</script>
