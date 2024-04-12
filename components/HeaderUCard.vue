<script setup>
const items = [
	[
		{
			label: 'Редактировать поля',
		},
		{
			label: 'Настройка отображения',
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
			<p class="text-xs leading-6 text-gray-400">Обновлено: 30.09.2023</p>
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
				<span @click="editApplication = !editApplication" class="truncate">{{
					item.label
				}}</span>
			</template>
		</UDropdown>
	</div>
</template>
