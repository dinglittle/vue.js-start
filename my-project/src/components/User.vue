<template>
    <div>
        <router-link to="name/name=lwj">Go name</router-link>
        <router-link to="age">Go age</router-link>
        User {{ $route.params.id }} {{ $route.params.name }} {{ $route.params.age }} 
        <router-view></router-view>
    </div>
</template>