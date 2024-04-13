<script setup>
import { format } from 'date-fns';

// Получение заявки
const { data: applicationCard } = await useFetch(
	'https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess'
);

// Получение даты создания заявки
const date = ref(new Date(applicationCard.value.leadData.createdAt));

const boardOpen = ref(false);
const managerOpen = ref(false);

defineShortcuts({
	o: () => (boardOpen.value = !boardOpen.value),
	b: () => (managerOpen.value = !managerOpen.value),
});

const leadData = ref(applicationCard.value.leadData);
const reference = ref(applicationCard.value.reference);
//console.log(leadData);
// console.log(reference);

// Получение leadBoards
const leadBoards = reference.value.leadBoards.map(leadBoard => {
	//console.log(leadBoard);
	return leadBoard;
});

const getLeadBoardsId = leadBoards.filter(
	item => item.id === leadData.value.board
);

const selectedLeadBoards = ref(getLeadBoardsId[0]);

// Получение managerList

const managerList = reference.value.managerList.map(leadBoard => {
	//console.log(leadBoard);
	return leadBoard;
});

const getManagerListId = managerList.filter(
	item => item.id === leadData.value.manager
);

const selectedManagerList = ref(getManagerListId[0]);
</script>

<template>
	<div class="grid grid-cols-2 gap-2">
		<div class="grid">
			<p class="text-sm leading-6 text-gray-400">Дата создания</p>

			<UPopover :popper="{ placement: 'bottom-start' }">
				<UButton
					class="w-full flex-row-reverse justify-between text-gray-200 [&>span]:text-gray-700 [&>svg]:text-gray-700 hover:text-gray-700 duration-150"
					icon="i-heroicons-calendar-days-20-solid"
					:label="format(date, 'dd.MM.yyy')"
					variant="outline"
				/>

				<template #panel="{ close }">
					<DatePicker v-model="date" is-required @close="close" />
				</template>
			</UPopover>
		</div>

		<div class="grid">
			<p class="text-sm leading-6 text-gray-400">Доска</p>
			<USelectMenu
				v-model="selectedLeadBoards"
				:options="leadBoards"
				option-attribute="title"
			>
				<UButton
					variant="outline"
					color="blue"
					class="flex-1 justify-between text-gray-300"
				>
					<span class="text-gray-800">{{ selectedLeadBoards.title }}</span>

					<UIcon
						name="i-heroicons-chevron-down-20-solid"
						class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
					/>
				</UButton>
				<template #option="{ option: leadBoard }">
					<span class="truncate">{{ leadBoard.title }}</span>
				</template>
			</USelectMenu>
		</div>

		<div class="grid col-span-2">
			<p class="text-sm leading-6 text-gray-400">Менеджер</p>
			<USelectMenu
				v-model="selectedManagerList"
				:options="managerList"
				option-attribute="name"
			>
				<UButton
					variant="outline"
					color="blue"
					class="flex-1 justify-between text-gray-300"
				>
					<span class="text-gray-800">{{ selectedManagerList.name }}</span>

					<UIcon
						name="i-heroicons-chevron-down-20-solid"
						class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
					/>
				</UButton>

				<template #option="{ option: manager }">
					<UAvatar v-if="manager.avatar" :src="manager.avatar" size="2xs" />
					<span class="truncate">{{ manager.name }}</span>
				</template>
			</USelectMenu>
		</div>
	</div>
</template>
