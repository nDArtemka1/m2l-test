<script setup>
const { leadData, reference, loading } = inject('appCard');

// Получение managerList
const managerList = reference.value.managerList.map(manager => {
	return manager;
});

const getManagerListId = managerList.filter(
	item => item.id === leadData.value.manager
);

const selectedManagerList = ref(getManagerListId[0]);
</script>

<template>
	<div class="grid col-span-2">
		<p class="text-sm leading-6 text-gray-400">Менеджер</p>
		<USkeleton v-if="loading" class="h-4 w-[200px]" />
		<USelectMenu
			v-else
			v-model="selectedManagerList"
			:options="managerList"
			:option-avatar="managerList.avatar"
			option-attribute="name"
		>
			<UButton
				variant="outline"
				color="blue"
				class="group flex-1 justify-between text-gray-300"
			>
				<span class="text-gray-800">{{ selectedManagerList.name }}</span>

				<UIcon
					name="i-heroicons-chevron-down-20-solid"
					class="w-5 h-5 transition-transform text-gray-400 group-hover:text-blue-400"
				/>
			</UButton>

			<template #option="{ option: manager }">
				<UAvatar v-if="manager.avatar" :src="manager.avatar" size="2xs" />
				<span class="truncate">{{ manager.name }}</span>
			</template>
		</USelectMenu>
	</div>
</template>
