<script>
import GalleryBig from './GalleryBig.vue';
import GalleryList from './GalleryList.vue';

export default {
    name: 'App',
    components: { GalleryBig, GalleryList },
    data() {
        return {
            bigImgUrl: '../public/images/dog1.jpg',
            items: [
                {id: 1, imgUrl: '../public/images/dog1.jpg'},
                {id: 2, imgUrl: '../public/images/dog2.jpg'},
                {id: 3, imgUrl: '../public/images/dog3.jpg'},
                {id: 4, imgUrl: '../public/images/dog4.jpg'},
                {id: 5, imgUrl: '../public/images/dog5.jpg'},
            ]
        }
    },
    methods: {
        imgChangedHandler(e) {
            console.log(e);
            this.bigImgUrl = e.imgUrl;
            console.log(e.imgUrl);
        },
    }
}

</script>

<template>
  <GalleryBig :imgUrl=bigImgUrl />
  <GalleryList :items=items @imgChanged="imgChangedHandler" />
  <div>Gallery - {{bigImgUrl}}</div>

</template>

<style scoped></style>
