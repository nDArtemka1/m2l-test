<script setup>
import axios from 'axios';
import { format } from 'date-fns';

const { leadData, reference, contacts, loading, error } = inject('appCard');

// Получение даты рождения
const date = ref(new Date(contacts.value.birthday));

// Получение leadSources
const leadSources = reference.value.leadSources.map(leadSource => {
	return leadSource;
});

// Сортировка нужного leadSource
const getLeadSourcesId = leadSources.filter(
	item => item.id === leadData.value.leadSource
);

// Выбранный leadSource
const selectedLeadSources = ref(getLeadSourcesId[0]);

const editApplication = useEditApplication();

async function updateAppCard() {
	try {
		loading.value = true;
		await axios.patch('https://5ec761cf17a971bb.mokky.dev/m2lab/1', {
			leadData: {
				createdAt: '05.04.2019 10:58:44',
				updatedAt: '09.04.2024 16:11:14',
				manager: 128,
				leadStatus: 417,
				leadSource: selectedLeadSources.value.id,
				board: 209,
				leadName: 'Новая заявка',
				leadColor: null,
				tags: [],
				agency: null,
				object: 86,
				rooms: null,
				objectNumber: '175',
				realtyCategory: null,
				contacts: {
					name: contacts.value.name,
					phone: contacts.value.phone,
					birthday: contacts.value.birthday,
					email: null,
					socialType: null,
					nickName: null,
					additionalContacts: [
						{
							contact: contacts.value.additionalContacts[0].contact,
							description: 'Гагарин Анатолий',
						},
					],
				},
			},
		});
	} catch (err) {
		error.value = err.message;
	} finally {
		console.log(leadData.value);
		editApplication.value = !editApplication.value;
		loading.value = false;
	}
}
</script>

<template>
	<div class="flex flex-col justify-between">
		<h3 class="text-base font-semibold leading-6 text-gray-950">
			Основной контакт
		</h3>

		<p v-if="loading" class="flex flex-col gap-4">
			<span class="m-8">Загрузка...</span>

			<USkeleton v-if="loading" class="h-4 w-[120px]" />

			<USkeleton v-if="loading" class="h-4 w-[200px]" />

			<USkeleton v-if="loading" class="h-4 w-[150px]" />
		</p>
		<p v-else-if="error">{{ error }}</p>

		<div v-else class="grid gap-2">
			<UForm
				:state="contacts"
				class="space-y-2 [&_label]:font-normal [&_label]:text-sm [&_label]:leading-6 [&_label]:text-gray-400"
				@submit="updateAppCard"
			>
				<UFormGroup label="ФИО" name="name">
					<span
						v-if="!editApplication && contacts.name === null"
						class="text-base leading-6 text-gray-950"
					>
						ФИО не указано
					</span>
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-gray-950"
						>{{ contacts.name }}</span
					>
					<UInput v-else v-model="contacts.name" />
				</UFormGroup>

				<UFormGroup label="Дата рождения" name="date">
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-gray-950"
						>{{ format(date, 'dd.MM.yyy') }}</span
					>
					<GetDate
						v-else
						v-model="contacts.birthday"
						type="date"
						:birthday="true"
					/>
				</UFormGroup>

				<UFormGroup label="Номер телефона" name="phone">
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-blue-600"
						>{{ contacts.phone }}</span
					>
					<UInput v-else v-model="contacts.phone" type="phone" />
				</UFormGroup>

				<UFormGroup label="Доп. номер телефона" name="addPhone">
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-blue-600"
						>{{ contacts.additionalContacts[0].contact }}</span
					>
					<UInput
						v-else
						v-model="contacts.additionalContacts[0].contact"
						type="addPhone"
					/>
				</UFormGroup>

				<UFormGroup label="Канал поступления" name="receiptChannel">
					<span
						v-if="!editApplication"
						class="text-base leading-6 text-blue-600"
						>{{ selectedLeadSources.title }}</span
					>
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
				</UFormGroup>

				<UButton
					v-if="editApplication"
					color="gray"
					variant="solid"
					class="mt-5"
					type="submit"
					block
				>
					Сохранить изменения
				</UButton>
			</UForm>
		</div>
	</div>
</template>
