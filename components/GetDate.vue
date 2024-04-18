<script setup>
import { format } from 'date-fns';

const props = defineProps({
	title: String,
	createdAt: Boolean,
	updatedAt: Boolean,
	birthday: Boolean,
});
const { leadData, loading } = inject('appCard');

// Проверка на входные данные, дату создания, дату обновления и дату рождения,
const getDateValue = computed(() => {
	if (props.createdAt) {
		return leadData.value.createdAt;
	} else if (props.updatedAt) {
		return leadData.value.updatedAt;
	} else if (props.birthday) {
		return leadData.value.contacts.birthday;
	}
});

// Получение даты создания заявки
const date = ref(new Date(getDateValue.value));

const editApplication = useEditApplication();
</script>

<template>
	<div class="grid">
		<p v-if="props.title" class="text-sm leading-6 text-gray-400">
			{{ props.title }}
		</p>

		<USkeleton v-if="loading" class="h-4 w-[200px]" />
		<span
			v-else
			v-if="!editApplication"
			class="text-base leading-6 text-gray-950"
			>{{ format(date, 'd.MM.yyy') }}</span
		>
		<UPopover v-else :popper="{ placement: 'bottom-start' }">
			<UButton
				class="w-full flex-row-reverse justify-between text-gray-200 [&>span]:text-gray-700 [&>svg]:text-gray-700 hover:text-blue-400 duration-150"
				icon="i-heroicons-calendar-days-20-solid"
				:label="format(date, 'd.MM.yyy')"
				variant="outline"
			/>

			<template #panel="{ close }">
				<DatePicker v-model="date" is-required @close="close" />
			</template>
		</UPopover>
	</div>
</template>
