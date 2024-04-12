<script setup lang="ts">
import { format } from 'date-fns';

const date = ref(new Date());

const items = ref([
	{
		header: 'ФИО',
		content: 'Васильев Алексей',
		textColor: 'text-gray-950',
		phoneCheckBox: false,

		input: true,
		datePicker: false,
		dropDown: false,
	},
	{
		header: 'Дата рождения',
		content: '10.09.1991',
		textColor: 'text-gray-950',
		phoneCheckBox: false,

		input: false,
		datePicker: true,
		dropDown: false,
	},
	{
		header: 'Номер телефона',
		content: '8 912 123 12 12',
		textColor: 'text-blue-600',
		phoneCheckBox: true,
		phoneSelectedCheckBox: false,
		input: true,
		datePicker: false,
		dropDown: false,
	},
	{
		header: 'Доп. номер телефона',
		content: '8 911 111 13 09',
		textColor: 'text-blue-600',
		phoneCheckBox: false,

		input: true,
		datePicker: false,
		dropDown: false,
	},
	{
		header: 'Канал поступления',
		content: 'Сайт ЖК',
		textColor: 'text-blue-600',
		phoneCheckBox: false,

		input: false,
		datePicker: false,
		dropDown: true,
	},
]);

const itemsDrop = [
	[
		{
			label: 'Сайт ЖК',
		},
		{
			label: 'Высшая',
		},
	],
];

const channelOpen = ref(false);

defineShortcuts({
	o: () => (channelOpen.value = !channelOpen.value),
});

const editApplication = useEditApplication();

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
	<div class="flex flex-col justify-between">
		<h3 class="text-base font-semibold leading-6 text-gray-950">
			Основной контакт
		</h3>
		<div class="grid gap-2">
			<div class="grid" v-for="(item, id) in items" :key="id">
				<div class="flex items-center justify-between">
					<p class="text-sm leading-6 text-gray-400">
						{{ item.header }}
					</p>

					<UCheckbox
						v-model="item.phoneSelectedCheckBox"
						v-if="item.phoneCheckBox && editApplication"
						:model-value="false"
						name="notifications"
					>
						<template #label>
							<p class="text-sm leading-6 text-gray-400">нет телефона</p>
						</template>
					</UCheckbox>
				</div>

				<p
					v-if="!editApplication"
					:class="item.textColor"
					class="text-base leading-6"
				>
					{{ item.content }}
				</p>

				<div v-if="editApplication">
					<UInput
						:disabled="item.phoneSelectedCheckBox"
						v-if="item.input"
						variant="outline"
						:model-value="item.content"
						class="disabled:[&>input]:bg-gray-300 disabled:[&>input]:text-gray-300"
					/>

					<UPopover
						v-if="item.datePicker"
						:popper="{ placement: 'bottom-start' }"
					>
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

					<UInputMenu
						v-if="item.dropDown"
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
		</div>
	</div>
</template>
