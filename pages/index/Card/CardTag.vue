<template>
  <div class="bg-s">
    <div text-14px leading-16px text="#404040" class="title">{{ cardTag.title }}</div>
    <div class="level">
      <div mr-12px>级别：{{ convertLevel(cardTag.course_level) }}</div>
      <span ml-4px flexc>
        <img mr-4px src="/images/fire.png" v-for="i in 5" :key="i" w-14px h-14px />
      </span>
    </div>
    <div class="peoples-price">
      <span class="peoples" text-16px color="#7f7f7f">
        <user-outlined />
        {{ cardTag.uv }}
      </span>
      <div class="price" flexc>
        <div color="#aaaaaa">
          ¥<span class="price-original">{{ cardTag.old_amount }}</span>
        </div>
        <div color="#e51b11">
          ¥<span class="price-present">{{ cardTag.amount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProductList } from "~/types/api";
// 在这里可以复用type
interface IProps {
  cardTag: ProductList;
}

defineProps<IProps>();

const convertLevel = (level: string) => {
  switch (level) {
    case "JUNIOR":
      return "初级";
    case "MIDDLE":
      return "中级";
    case "SENIOR":
      return "高级";
    default:
      return "未知";
  }
};
</script>

<style lang="less" scoped>
.bg-s {
  padding: 10px;
  .title {
    height: 32px;
    width: 260px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.level {
  display: flex;
  font-size: 14px;
  color: #7f7f7f;
  margin-top: 5px;
  align-items: center;
}

.peoples-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  .price {
    &-original {
      font-size: 14px;
      margin-right: 5px;
      text-decoration: line-through;
    }

    &-present {
      font-size: 16px;
      margin-top: -5px;
    }
  }
}
</style>
