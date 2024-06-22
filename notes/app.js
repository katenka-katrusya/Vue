const App = {
  data() {
    return {
      title: 'Notes',
      input: {
        value: '',
        placeholder: 'Напиши что-то...',
      },
      editInput: {
        value: '',
        placeholder: 'Измени задачу...'
      },
      notes: [
        {id: 1, name: 'task 1', isDblclick: false},
        {id: 2, name: 'task 2', isDblclick: false},
        {id: 3, name: 'task 3', isDblclick: false},
        {id: 4, name: 'task 4', isDblclick: false},
      ],
    }
  },

  mounted() {
    this.getNotes();
  },

  watch: {
    notes: {
      handler(updList) {
        const notes = JSON.stringify(updList);
        localStorage.setItem('notes', notes);
      },
      deep: true,
    },
  },

  methods: {
    getNotes() {
      const localNotes = localStorage.getItem('notes');

      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },

    changeTask(name, id) {
      this.notes.forEach(note => {
        if (note.id !== id) {
          note.isDblclick = false;
        }
      })

      let note = this.notes.find(note => note.id === id);

      if (note.isDblclick) {
        const inputValue = this.editInput.value.trim();
        inputValue ? (note.name = inputValue) : (note.name = name);
        this.editInput.value = '';
      }

      note.isDblclick = !note.isDblclick;

    },

    onSubmit() {
      const note = this.input.value.trim();

      if(!note) return;

      const newNote = {
          id: new Date().getTime(),
          name: note,
          isDblclick: false,
      }

      this.notes.push(newNote);
      this.input.value = '';
    },

    removeElement(id) {
      this.notes = this.notes.filter(note => note.id !== id);
    }
  }
}

Vue.createApp(App).mount('#app');
