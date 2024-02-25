<template>
  <div
    class="d-flex flex-col w-5-24 bg-white pos-abs pos-center"
  >
    <div
      class="bg-grey-lighter d-flex flex-row flex-h-space-between pad-h-6 pad-v-4 flex-center"
    >
      <action-h2
        text="Заголовок"
      />
      <img class="cursor-pointer" src="../assets/img/clear.svg" alt="clear">
    </div>
    <form class="d-flex flex-col" @submit.prevent="submitForm">
      <action-h2
        text="Заголовок"
        class="pad-top-4 pad-left-6 mar-bot-4"
      />
      <action-input
        v-model.trim="firstName"
        type="text"
        labelText="Имя"
        :isRequired=true
        :isError="errors.firstName"
        pickedIcon="personIcon"
      />
      <action-input
        v-model.trim="lastName"
        type="text"
        labelText="Фамилия"
        :isRequired=true
        :isError="errors.lastName"
        pickedIcon="personIcon"
      />
      <action-input
        v-model.trim="patronymic"
        type="text"
        labelText="Отчество"
        :isRequired=false
        :isError="errors.patronymic"
        pickedIcon="personIcon"
      />
      <action-input
        v-model.trim="snils.maskedSnils"
        v-maska:[snils.optionsForSnils]="snils.bindedSnils"
        type="text"
        labelText="СНИЛС"
        :isRequired=false
        :isError="errors.snils"
        pickedIcon="numbersIcon"
      />
      <action-select
        :items="position.arrayOfPositions"
        labelText="Должность"
        v-model="position.selectedPosition"
        :isRequired=true
        :isError="errors.position"
        pickedIcon="briefcaseIcon"
      />
      <action-h2
        text="Заголовок"
        class="pad-top-4 pad-left-6 mar-bot-4"
      />
      <action-input
        v-model.trim="tel.maskedTel"
        v-maska:[tel.optionsForTel]="tel.bindedTel"
        type="tel"
        labelText="Телефон"
        :isRequired=true
        :isError="errors.tel"
        pickedIcon="mobileIcon"
      />
      <action-input
        v-model.trim="email"
        type="email"
        labelText="Электронная почта"
        :isRequired=true
        :isError="errors.email"
        pickedIcon="emailIcon"
      />
      <div class="mar-top-8">
        <hr class="dashed mar-top-6" />
        <div class="mar-top-5 d-flex flex-h-end mar-right-6 mar-bot-5">
          <action-button
            buttonText="Отмена"
            color="btn-ghost"
          />
          <action-button
            buttonText="Button"
            type="submit"
            color="btn-primary"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { vMaska } from 'maska';
import axios from 'axios';
import 'goodt-framework-css';
import ActionInput from '../components/ActionInput.vue';
import ActionButton from '../components/ActionButton.vue';
import ActionSelect from '../components/ActionSelect.vue';
import ActionH2 from '../components/ActionH2.vue';

export default {
  name: 'App',
  components: {
    ActionInput,
    ActionButton,
    ActionSelect,
    ActionH2,
  },
  directives: {
    maska: vMaska,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      patronymic: null,
      snils: {
        maskedSnils: null,
        bindedSnils: {
          masked: null,
          unmasked: null,
        },
        optionsForSnils: {
          mask: '###-###-###-##',
          eager: true,
        },
      },
      position: {
        arrayOfPositions: [],
        selectedPosition: null,
      },
      tel: {
        maskedTel: null,
        bindedTel: {
          masked: null,
          unmasked: null,
        },
        optionsForTel: {
          mask: '+7-###-###-####',
          eager: true,
        },
      },
      email: null,
      errors: {
        firstName: false,
        lastName: false,
        patronymic: false,
        snils: false,
        position: false,
        tel: false,
        email: false,
      },
    };
  },
  created() {
    this.fetchPositions();
  },
  methods: {
    clearErrors() {
      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = false;
      });
    },
    validateForm() {
      this.clearErrors();
      const fieldsToCheck = {
        firstName: this.firstName,
        lastName: this.lastName,
        patronymic: this.patronymic,
        snils: this.snils.bindedSnils.masked,
        position: this.position.selectedPosition,
        tel: this.tel.bindedTel.masked,
        email: this.email,
      };
      const regexp = {
        firstName: /^[А-Я][а-яё]*$/,
        lastName: /^[А-Я][а-яё]*$/,
        patronymic: /^[А-Я][а-яё]*$/,
        snils: /^\d{3}-\d{3}-\d{3}-\d{2}$/,
        position: /^[А-Я][а-яё]*$/,
        tel: /^\+7-\d{3}-\d{3}-\d{4}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      };
      let isValid = true;
      Object.entries(fieldsToCheck).forEach(([fieldName, value]) => {
        if ((fieldName === 'patronymic' || fieldName === 'snils') && value === null) {
          return;
        }
        const pattern = regexp[fieldName];
        if (!pattern.test(value)) {
          isValid = false;
          this.errors[fieldName] = true;
        }
      });
      return isValid;
    },
    async fetchPositions() {
      try {
        const response = await axios.get('http://localhost:3000/positions');
        this.position.arrayOfPositions = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка должностей:', error);
      }
    },
    createUser() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        patronymic: this.patronymic,
        snils: this.snils.bindedSnils.unmasked,
        position: this.position.selectedPosition,
        tel: this.tel.bindedTel.unmasked,
        email: this.email,
      };
      const user = {};
      const entries = Object.entries(data);
      entries.map(([key, value]) => {
        if (value !== null || value !== '') {
          user[key] = value;
        }
        return true;
      });
      return user;
    },
    async submitForm() {
      if (this.validateForm()) {
        const user = this.createUser();
        try {
          const response = await axios.post('http://localhost:3000/submit-form', user);
          if (response.status === 200) {
            console.log(response.status);
          }
        } catch (error) {
          console.error('Ошибка:', error.response.data.errors);
        }
      }
    },
  },
};
</script>
