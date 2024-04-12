<script setup lang="ts">
import { format } from 'date-fns';

const date = ref(new Date());

const boardOpen = ref(false);
const managerOpen = ref(false);

defineShortcuts({
	o: () => (boardOpen.value = !boardOpen.value),
	b: () => (managerOpen.value = !managerOpen.value),
});

const loading = ref(false);
const selected = ref();
async function search(q: string) {
	loading.value = true;

	const users = await $fetch<any[]>(
		'https://jsonplaceholder.typicode.com/users',
		{ params: { q } }
	);

	loading.value = false;
	selected.value = users[0];

	return users;
}
</script>

<template>
	<div class="grid grid-cols-2 gap-2">
		<div class="grid">
			<p class="text-sm leading-6 text-gray-400">Дата создания</p>

			<UPopover :popper="{ placement: 'bottom-start' }">
				<UButton
					class="w-full flex-row-reverse justify-between text-gray-200 [&>span]:text-gray-700 [&>svg]:text-gray-700 hover:text-gray-700 duration-150"
					icon="i-heroicons-calendar-days-20-solid"
					:label="format(date, 'd.MM.yyy')"
					variant="outline"
				/>

				<template #panel="{ close }">
					<DatePicker v-model="date" is-required @close="close" />
				</template>
			</UPopover>
		</div>

		<div class="grid">
			<p class="text-sm leading-6 text-gray-400">Доска</p>
			<UInputMenu
				v-model="selected"
				:search="search"
				:loading="loading"
				placeholder="Search for a user..."
				option-attribute="name"
				trailing
				by="id"
			/>
		</div>

		<div class="grid col-span-2">
			<p class="text-sm leading-6 text-gray-400">Менеджер</p>
			<UInputMenu
				v-model="selected"
				:search="search"
				:loading="loading"
				placeholder="Search for a user..."
				option-attribute="name"
				trailing
				by="id"
			/>
		</div>
	</div>
</template>
