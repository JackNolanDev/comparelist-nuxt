<template>
  <div @keyup.esc="() => (state.selected = undefined)">
    <div class="container page">
      <h1 class="display-2 text-center mt-2">
        Compare Bestseller<span class="d-none d-md-inline"> List</span>s
      </h1>
      <label
        for="active-list-sel"
        class="form-label"
      >
        Choose list to explore:
      </label>
      <select
        id="active-list-sel"
        v-model="state.activeList"
        class="form-select"
      >
        <option :value="SupportedLists.HARDCOVER_FICTION">
          Hardcover Fiction
        </option>
        <option :value="SupportedLists.HARDCOVER_NONFICTION">
          Hardcover Nonfiction
        </option>
        <option :value="SupportedLists.PAPERBACK_FICTION">
          Paperback Fiction
        </option>
        <option :value="SupportedLists.PAPERBACK_NONFICTION">
          Paperback NonFiction
        </option>
        <option :value="SupportedLists.MASS_MARKET">
          Mass Market
        </option>
        <option :value="SupportedLists.PICTURE_BOOK">
          Picture Books
        </option>
      </select>
      <div class="row mt-5 mb-5">
        <div
          v-for="(sublist, name) in filteredLists"
          :key="name"
          class="col-12"
          :class="colClass"
        >
          <div v-if="sublist && sublist[state.activeList]">
            <h4>{{ sublist.disp }}</h4>
            <div>{{ sublist[state.activeList]!.name }}</div>
            <div>
              <i>From {{ formatDate(sublist[state.activeList]!.date) }}</i>
            </div>
            <div class="list-group list-group-numbered mt-3">
              <button
                v-for="(book, idx) in sublist[state.activeList]!.books"
                :key="idx"
                class="list-group-item list-group-item-action d-flex align-items-start book"
                @click="state.selected = book"
              >
                <div class="me-1">
                  {{ book.rank }}.
                </div>
                <div class="flex-grow-1">
                  <div>
                    <b>{{ book.title }}</b>
                  </div>
                  <div class="mt-1">
                    By {{ book.author }}
                    <span class="text-muted">| {{ book.publisher }}</span>
                  </div>
                </div>
                <img
                  v-if="book.image"
                  :src="book.image"
                  :alt="'Cover for ' + book.title"
                  height="150px"
                  onerror="this.style.display='none'"
                >
              </button>
            </div>
            <p class="text-muted mt-4">
              This list updates {{ sublist[state.activeList]!.rate }}.
            </p>
            <list-details :list="name" />
          </div>
        </div>
      </div>
      <compare-book
        :book="state.selected"
        @close="()=> state.selected = undefined"
      />
    </div>
    <page-footer />
  </div>
</template>

<script setup lang="ts">
import { SupportedLists } from "@/composables/types";

const state = reactive<{
  activeList: SupportedLists;
  selected: Book | undefined;
}>({ activeList: SupportedLists.HARDCOVER_FICTION, selected: undefined });
const compareListData = useCompareListData();

const filteredLists = computed(() => {
  const list: Partial<CompareListData> = {};
  Object.entries(compareListData).forEach(([key, map]) => {
    if (state.activeList in map) {
      list[key as keyof CompareListData] = map;
    }
  });
  return list;
});
const colClass = computed(
  () => `col-xl-${Math.floor(12 / Object.keys(filteredLists.value).length)}`
);

const formatDate = (date: string) => new Date(date).toDateString();
</script>

<style scoped>
.page {
  position: relative;
  min-height: calc(100vh - 64px);
}
.book {
  min-height: 168px;
}
</style>
