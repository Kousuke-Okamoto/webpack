<template>
    <p>{{ message }}</p>
</template>

<script>
    export default {
        data: () => {
            console.log('This is vue!!');
            return{
                message: 'Hey, This is vue!!',//{{message}}の中身を指示している
            };
        },
    };
</script>

<style scoped>/*scopedでこのコンポーネント内だけにスタイルが適用されるようになっている*/
 p{
     color: green;
 }
</style>
