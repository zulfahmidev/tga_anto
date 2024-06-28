<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>

<script>
import mqtt from '../plugins/mqtt';

export default {
    mounted() {
        mqtt.subscribe('anto', (err) => {
            if (!err) {
            console.log(`Subscribed to 'anto'`);
            } else {
            console.error(`Failed to subscribe: ${err}`);
            }
        });
    }
}
</script>