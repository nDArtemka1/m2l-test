<script setup>
import { format } from 'date-fns';

const props = defineProps({
	title: String,
	createdAt: Boolean,
	updatedAt: Boolean,
});

const { leadData } = inject('appCard');

// Проверка на входные данные, дату создания и дату рождения, даты рождения нету, поэтому вставлю дату обновления
const getDateValue = computed(() => {
	if (props.createdAt) {
		return leadData.value.createdAt;
	} else if (props.updatedAt) {
		return leadData.value.updatedAt;
	}
});

// Получение даты создания заявки
const date = ref(new Date(getDateValue.value));
</script>

<template>
	<div class="grid">
		<p class="text-sm leading-6 text-gray-400">{{ props.title }}</p>

		<UPopover :popper="{ placement: 'bottom-start' }">
			<UButton
				class="w-full flex-row-reverse justify-between text-gray-200 [&>span]:text-gray-700 [&>svg]:text-gray-700 hover:text-blue-400 duration-150"
				icon="i-heroicons-calendar-days-20-solid"
				:label="format(date, 'MM.dd.yyy')"
				variant="outline"
			/>

			<template #panel="{ close }">
				<DatePicker v-model="date" is-required @close="close" />
			</template>
		</UPopover>
	</div>
</template>
