<script lang="ts">
  type Todo = {
    text: string;
    done: boolean;
  };

  type Filters = "all" | "active" | "completed";

  let todos = $state<Todo[]>([]);

  function addTodo(event: KeyboardEvent) {
    if (event.key !== "Enter") return;

    const todoEl = event.target as HTMLInputElement;

    if (!todoEl.value) return;

    todos.push({
      text: todoEl.value,
      done: false,
    });

    todoEl.value = "";
  }

  function editTodo(event: Event) {
    const inputEl = event.target as HTMLInputElement;

    const index = +inputEl.dataset.index!;

    todos[index].text = inputEl.value;
  }

  function togggleTodo(event: Event) {
    const inputEl = event.target as HTMLInputElement;

    const index = +inputEl.dataset.index!;

    todos[index].done = !todos[index].done;
  }

  let filter = $state<Filters>("all");

  function setFilter(newFilter: Filters) {
    filter = newFilter;
  }

  let filteredTodos = $derived(filterTodos());

  function filterTodos() {
    switch (filter) {
      case "all":
        return todos;

      case "active":
        return todos.filter((todo) => !todo.done);

      case "completed":
        return todos.filter((todo) => todo.done);
    }
  }

  function deleteTodo(index: number) {
    return todos.splice(index, 1);
  }

  function remaining(type: Filters) {
    if (type === "all") {
      return todos.length;
    } else if (type === "active") {
      return todos.filter((todo) => !todo.done).length;
    } else {
      return todos.filter((todo) => todo.done).length;
    }
  }

  $effect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      todos = JSON.parse(savedTodos);
    }
  });

  $effect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });
</script>

<div class="grid gap-4 m-4">
  <input
    type="text"
    placeholder="Add Todo"
    onkeydown={addTodo}
    class="border w-full p-4"
  />

  <div class="border p-2 flex justify-between items-center">
    <div>
      <button
        class:active={filter === "all"}
        class={"p-2 border min-w-20 px-8"}
        onclick={() => setFilter("all")}
        >All
        {remaining("all")}
      </button>
      <button
        class:active={filter === "active"}
        class={"p-2 border min-w-20 px-8"}
        onclick={() => setFilter("active")}>Active {remaining("active")}</button
      >
      <button
        class:active={filter === "completed"}
        class={"p-2 border min-w-20 px-8"}
        onclick={() => setFilter("completed")}
        >Completed {remaining("completed")}</button
      >
    </div>
  </div>

  {#each filteredTodos as todo, index}
    <div
      class="border transition-opacity duration-300 flex justify-between items-center pr-4"
      class:completed={todo.done}
    >
      <input
        oninput={editTodo}
        data-index={index}
        type="text"
        value={todo.text}
        class="w-full p-4"
        class:line-through={todo.done}
      />
      <div class="flex items-center gap-4">
        <input
          type="checkbox"
          data-index={index}
          checked={todo.done}
          onchange={togggleTodo}
        />

        <button
          class="bg-red-500 px-4 text-white py-2 hover:bg-red-600 transition-all duration-300"
          onclick={() => deleteTodo(index)}>Delete</button
        >
      </div>
    </div>
  {/each}
</div>

<style>
  .completed {
    opacity: 0.5;
  }

  .active {
    background-color: #3b82f6;
  }
</style>
