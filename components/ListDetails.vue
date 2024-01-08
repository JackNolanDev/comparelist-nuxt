<template>
  <div>
    <div v-if="list === 'nyt'">
      <p>
        The New York Times bestsellers list uses data from both independent
        booksellers and major companies like Barnes &amp; Noble and Amazon,
        along with other markets, like supermarkets, gift shops, and newsstands.
        The way the New York Times actually interprets or weights this data is
        unknown, but probably not just directly based on raw sales numbers.
      </p>
    </div>
    <div v-else-if="list === 'indie'">
      <p>
        The IndieBound list is compiled by the American Booksellers Association
        who use data reported by a large number of independent bookstores.
        However, titles are ordered by their average sales rank at individual
        bookstores instead of by overall sales numbers. That means that a book
        which technically sells the largest number of copies may not be at the
        first spot of the list if it was not the bestselling book at the
        majority of independent bookstores. This gives a lot more swaying power
        to smaller booksellers.
      </p>
    </div>
    <div v-else-if="list === 'publishers'">
      <p>
        Publishers Weekly pulls its data from the BookScan service, and orders
        its list according to raw sales numbers. BookScan pulls data from
        approximately 75-85% of all printed book sales in the US, including
        sales from major booksellers like Amazon, Barnes &amp; Noble, Walmart,
        and thousands of smaller independent bookstores as well.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ list: string }>();
</script>
