<script>
import GalleryListItem from './GalleryListItem.vue';

export default {
    name: 'GalleryList',
    data() {
        return {
            imgUrl: ''
        }
    },
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GalleryListItem
    },
    methods: {
        imgChangedHandler(e) {
            this.imgUrl = e.imgUrl;
            console.log('GalleryList - ', this.imgUrl);
        },
    }
}
</script>

<template>
  <GalleryListItem v-for="item in items" :key="item.id" :imgUrl="item.imgUrl" @imgChanged="imgChangedHandler" @click="$emit('imgChanged', {imgUrl})"/>
  <div>List - {{imgUrl}}</div>
</template>

<style scoped></style>
