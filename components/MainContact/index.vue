<script setup>
import { format } from 'date-fns';

const date = ref(new Date());

// Получение заявки
const { data: applicationCard } = await useFetch(
	'https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess',
	{ lazy: false }
);

const leadData = ref(applicationCard.value.leadData);
const reference = ref(applicationCard.value.reference);

const contacts = ref(leadData.value.contacts);

// Получение leadSources
const leadSources = reference.value.leadSources.map(leadBoard => {
	return leadBoard;
});

const getLeadSourcesId = leadSources.filter(
	item => item.id === leadData.value.leadSource
);

const selectedLeadSources = ref(getLeadSourcesId[0]);

console;

const editApplication = useEditApplication();

const updateAppCard = async () => {
	await $fetch('https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		body: {
			leadData: {
				contacts: {
					phone: contacts.value.phone,
					nickName: contacts.value.nickName,
				},
				leadSource: selectedLeadSources.value.title,
			},
		},
	});
	console.log(applicationCard);
	editApplication.value = !editApplication.value;
};
</script>

<template>
	<div class="flex flex-col justify-between">
		<h3 class="text-base font-semibold leading-6 text-gray-950">
			Основной контакт
		</h3>

		<div class="grid gap-2">
			<div class="grid">
				<div class="flex items-center justify-between">
					<p class="text-sm leading-6 text-gray-400">ФИО</p>
				</div>
				<p
					v-if="!editApplication && contacts.nickName === null"
					class="text-base leading-6 text-gray-950"
				>
					ФИО не указано
				</p>
				<p
					v-else-if="!editApplication"
					class="text-base leading-6 text-gray-950"
				>
					{{ contacts.nickName }}
				</p>
				<UInput
					v-if="editApplication"
					variant="outline"
					v-model="contacts.nickName"
					class="disabled:[&>input]:bg-gray-300 disabled:[&>input]:text-gray-300"
				/>
			</div>

			<GetDate :title="'Дата рождения'" :updatedAt="true" />

			<div class="grid">
				<div class="flex items-center justify-between">
					<label class="text-sm leading-6 text-gray-400">Номер телефона</label>
				</div>

				<p v-if="!editApplication" class="text-base leading-6 text-blue-600">
					{{ contacts.phone }}
				</p>

				<UInput
					v-if="editApplication"
					variant="outline"
					v-model="contacts.phone"
					class="disabled:[&>input]:bg-gray-300 disabled:[&>input]:text-gray-300"
				/>
			</div>

			<div class="grid">
				<div class="flex items-center justify-between">
					<label class="text-sm leading-6 text-gray-400"
						>Доп. номер телефона</label
					>
				</div>

				<p v-if="!editApplication" class="text-base leading-6 text-blue-600">
					{{ contacts.additionalContacts[0].contact }}
				</p>

				<UInput
					v-if="editApplication"
					variant="outline"
					v-model="contacts.additionalContacts[0].contact"
					class="disabled:[&>input]:bg-gray-300 disabled:[&>input]:text-gray-300"
				/>
			</div>

			<div class="grid">
				<div class="flex items-center justify-between">
					<label class="text-sm leading-6 text-gray-400"
						>Канал поступления</label
					>
				</div>
				<p v-if="!editApplication" class="text-base leading-6 text-blue-600">
					{{ selectedLeadSources.title }}
				</p>
				<USelectMenu
					v-if="editApplication"
					v-model="selectedLeadSources"
					:options="leadSources"
					option-attribute="title"
				>
					<UButton
						variant="outline"
						color="blue"
						class="group flex-1 justify-between text-gray-300 duration-150"
					>
						<span class="text-gray-800">{{ selectedLeadSources.title }}</span>

						<UIcon
							name="i-heroicons-chevron-down-20-solid"
							class="w-5 h-5 transition-transform text-gray-400 group-hover:text-blue-400"
						/>
					</UButton>
					<template #option="{ option: leadSource }">
						<span class="truncate">{{ leadSource.title }}</span>
					</template>
				</USelectMenu>
			</div>
		</div>

		<UButton
			v-if="editApplication"
			@click="updateAppCard"
			color="gray"
			variant="solid"
			block
			class="mt-5"
			>Сохранить изменения</UButton
		>
	</div>
</template>
