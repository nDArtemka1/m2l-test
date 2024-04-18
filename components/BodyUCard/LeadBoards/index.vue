<script setup>
const { leadData, reference, loading } = inject('appCard');

// Получение leadBoards
const leadBoards = reference.value.leadBoards.map(leadBoard => {
	return leadBoard;
});

const getLeadBoardsId = leadBoards.filter(
	item => item.id === leadData.value.board
);

const selectedLeadBoards = ref(getLeadBoardsId[0]);
</script>

<template>
	<div class="grid">
		<p class="text-sm leading-6 text-gray-400">Доска</p>
		<USkeleton v-if="loading" class="h-4 w-[200px]" />
		<USelectMenu
			v-else
			v-model="selectedLeadBoards"
			:options="leadBoards"
			option-attribute="title"
		>
			<UButton
				variant="outline"
				color="blue"
				class="group flex-1 justify-between text-gray-300 duration-150"
			>
				<span class="text-gray-800">{{ selectedLeadBoards.title }}</span>

				<UIcon
					name="i-heroicons-chevron-down-20-solid"
					class="w-5 h-5 transition-transform text-gray-400 group-hover:text-blue-400"
				/>
			</UButton>

			<template #option="{ option: leadBoard }">
				<span class="truncate">{{ leadBoard.title }}</span>
			</template>
		</USelectMenu>
	</div>
</template>
