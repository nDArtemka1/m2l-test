<script setup>
import { format } from 'date-fns';

const props = defineProps({
	leadData: Object,
});

// Дата обновления заявки
const updateDate = ref(new Date(props.leadData.updatedAt));

const items = [
	[
		{
			label: 'Редактировать поля',
		},
	],
];

// Для связывания данных, чтобы можно было менять стили у шестеренки при открытом UDropdown
const headerOpenDrop = ref(false);

defineShortcuts({
	o: () => (headerOpenDrop.value = !headerOpenDrop.value),
});

// Редактирование заявки
const editApplication = useEditApplication();
</script>

<template>
	<div class="flex justify-between">
		<div class="flex flex-col justify-between">
			<h3 class="text-base font-semibold leading-6 text-gray-950">
				Заявка с сайта
			</h3>
			<p class="text-xs leading-6 text-gray-400">
				Обновлено: {{ format(updateDate, 'MM.dd.yyy') }}
			</p>
		</div>

		<UDropdown
			v-model:open="headerOpenDrop"
			:items="items"
			:popper="{ offsetDistance: -20, placement: 'bottom-start' }"
		>
			<UIcon
				:class="{ 'text-gray-700': headerOpenDrop }"
				class="w-5 h-5 text-gray-400 hover:text-gray-700 duration-150"
				name="i-heroicons-cog-8-tooth"
				dynamic
			/>

			<template #item="{ item }">
				<span
					@click="editApplication = !editApplication"
					class="truncate w-full text-start"
					>{{ item.label }}</span
				>
			</template>
		</UDropdown>
	</div>
</template>
