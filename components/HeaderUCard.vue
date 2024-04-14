<script setup>
// Получение заявки
const { data: applicationCard, pending } = await useFetch(
	'https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess',
	{ lazy: false }
);

const date = ref(new Date(applicationCard.value.leadData.updatedAt));

const updateDate = ref(
	('0' + date.value.getDate()).slice(-2) +
		'.' +
		('0' + date.value.getMonth()).slice(-2) +
		'.' +
		date.value.getFullYear()
);
//console.log(applicationCard.value.leadData.updatedAt);

const items = [
	[
		{
			label: 'Редактировать поля',
		},
	],
];

const headerOpenDrop = ref(false);

defineShortcuts({
	o: () => (headerOpenDrop.value = !headerOpenDrop.value),
});

const editApplication = useEditApplication();
</script>

<template>
	<div class="flex justify-between">
		<div class="flex flex-col justify-between">
			<h3 class="text-base font-semibold leading-6 text-gray-950">
				Заявка с сайта
			</h3>

			<p class="text-xs leading-6 text-gray-400">Обновлено: {{ updateDate }}</p>
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
