<template>
  <div
    :id="ID"
    class="modal fade"
    :class="showModalClass" 
    tabindex="-1"
    @click="modalClick"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            v-if="book"
            class="modal-title"
          >
            Compare {{ book.title }}
          </h4>
          <button
            type="button"
            class="btn-close"
            @click="emit('close')"
          />
        </div>
        <div class="list-group list-group-flush modal-content-scroll">
          <div
            v-for="(matched, idx) in matches"
            :key="'m' + idx"
            class="list-group-item"
          >
            <div class="d-flex justify-content-between">
              <div>
                <small class="fw-light">
                  {{ matched.source }} | {{ matched.category }}
                </small>
                <h5>{{ matched.title }}</h5>
                <div>
                  By {{ matched.author }}
                  <span class="text-muted">| {{ matched.publisher }}</span>
                </div>
                <p
                  v-if="matched.desc"
                  class="mt-3"
                >
                  <i>{{ matched.desc }}</i>
                </p>
              </div>
              <div class="text-end text-nowrap">
                <div>
                  Rank:
                  <span class="display-5">{{ matched.rank }}</span>
                </div>
                <div>
                  Last Rank: <b>{{ matched.lastRank }}</b>
                </div>
                <div>
                  Weeks on List: <b>{{ matched.wol }}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('close')"
          >
            Hide
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import stringSimilarity from "string-similarity";

const ID = "compare-book-modal"

const props = defineProps<{ book: Book | undefined }>();
const emit = defineEmits<{ (e: "close"): void }>();
const compareListData = useCompareListData();

const showModalClass = computed(() => (props.book ? "show showModal" : ""));

interface CompareBook extends Book {
  source: string;
  category: string;
}

const matches = computed((): CompareBook[] => {
  if (!props.book) {
    return [];
  }

  const books: CompareBook[] = [];
  Object.values(compareListData).forEach((source: Source) =>
    Object.values(source).forEach((list: string | BookList | undefined) => {
      if (!list || typeof list === "string") {
        return;
      }
      list.books.forEach((book) => {
        if (
          props.book &&
          stringSimilarity.compareTwoStrings(book.title, props.book.title) >
            0.32 &&
          stringSimilarity.compareTwoStrings(book.author, props.book.author) >
            0.32 &&
          stringSimilarity.compareTwoStrings(
            book.publisher,
            props.book.publisher
          ) > 0.32
        ) {
          books.push({
            ...book,
            source: source.disp,
            category: list.name,
          });
        }
      });
    })
  );
  return books;
});

const modalClick = (event: Event) => {
  // @ts-ignore
  if (event.target.id === ID) {
    emit('close')
  }
}
</script>

<style scoped>
.showModal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
.modal-content-scroll {
  max-height: 600px;
  overflow-y: scroll;
}
</style>
