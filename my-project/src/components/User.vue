<template>
    <div>
        <ul>
            <li>
                <button>
                    <router-link to="name" replace>Go name</router-link>
                </button>
            </li>
            <li>
                <button>
                    <router-link to="age" replace>Go age</router-link>
                </button>
            </li>
            <li>
                <button>
                    <!-- 这个匹配 到 空路由 -->
                    <router-link to="normal" replace>Go normal</router-link>
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{name:'Hello'}">Go Hello</router-link>
                </button>
            </li>
        </ul>
        <p style="border-top:1px solid; border-bottom:1px solid;padding:5px;">
            User {{ $route.params.id }} {{ $route.params.name }} {{ $route.params.age }}
        </p>
        <router-view style="background:#cdcdcd"></router-view>
        <router-view name="a"></router-view>
        <router-view name="b"></router-view>
    </div>
</template>