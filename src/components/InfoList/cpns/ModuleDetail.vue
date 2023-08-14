<template>
    <div class="detail">

        <div class="title">
            {{ packageInfo.title }}
        </div>
        <div class="desc">
            {{ packageInfo.desc }}
        </div>
        <div class="link">
            <div v-for="(link, name) in packageInfo.link" :key="name">
                <el-link :href="link" :underline="false" target="_blank">
                    {{ name }}
                    <el-icon size="10">
                        <i-ep-link />
                    </el-icon>
                </el-link>
            </div>
        </div>
        <el-divider/>
        <div class="bundle_title">
            Bundle Size
        </div>
        <div class="bundle_size">
            <div v-for="(size, name) in packageInfo.size" :key="name">
                <span class="name">
                    {{ `${name}: ` }}
                </span>
                <span class="size">
                    {{ `${size}B ` }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { IDetail } from '../type'

defineProps<{
    packageInfo: IDetail
}>()

</script>

<style lang='scss' scoped>
.title {
    font-size: 22px;
    font-weight: 800;
}

.desc {
    margin-top: 10px;
    font-size: 14px;
    font-style: italic;
}

.link {
    display: flex;
    margin-top: 10px;
    gap: 10px;
    .el-link {
        color:$light-color;
        font-size: 16px;
    }
    .el-link:hover{
        color:$hover-color;
        font-size: 16px;
    }
}

.el-divider {
    border: solid 2px;

    &--horizontal {
        height: 0;
        margin: 24px 0 12px 0;
    }
}

.bundle_title {
    font-size: 18px;
    font-weight: 800;
}

.bundle_size {
    margin-top: 10px;
    font-size: 14px;
    .size {
        font-weight: 600;
    }
}
</style>