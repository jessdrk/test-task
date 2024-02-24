<template>
  <div>
    <h1>
      {{ headers.first }}
    </h1>
  </div>
  <form class="changeForm" @submit.prevent="validateForm">
    <h1>
      {{ headers.second }}
    </h1>
    <action-input
      v-model.trim="firstName"
      type="text"
      labelText="Имя"
      :isRequired=true
      :isError="errors.firstName"
    />
    <action-input
      v-model.trim="lastName"
      type="text"
      labelText="Фамилия"
      :isRequired=true
      :isError="errors.lastName"
    />
    <action-input
      v-model.trim="patronymic"
      type="text"
      labelText="Отчество"
      :isRequired=false
      :isError="errors.patronymic"
    />
    <action-input
      v-model.trim="snils.maskedSnils"
      v-maska:[snils.optionsForSnils]="snils.bindedSnils"
      type="text"
      labelText="СНИЛС"
      :isRequired=false
      :isError="errors.snils"
    />
    <action-input
      v-model.trim="position"
      type="text"
      labelText="Должность"
      :isRequired=true
      :isError="errors.position"
    />
    <h1>
      {{ headers.thirth }}
    </h1>
    <action-input
      v-model.trim="tel.maskedTel"
      v-maska:[tel.optionsForTel]="tel.bindedTel"
      type="tel"
      labelText="Телефон"
      :isRequired=true
      :isError="errors.tel"
    />
    <action-input
      v-model.trim="email"
      type="email"
      labelText="Электронная почта"
      :isRequired=true
      :isError="errors.email"
    />
    <action-button
      buttonText="Отмена"
    />
    <action-button
      buttonText="Button"
      type="submit"
    />
  </form>
</template>

<script>
import { vMaska } from 'maska';
import ActionInput from './components/ActionInput.vue';
import ActionButton from './components/ActionButton.vue';

export default {
  name: 'App',
  components: {
    ActionInput,
    ActionButton,
  },
  directives: {
    maska: vMaska,
  },
  data() {
    return {
      headers: {
        first: 'Заголовок',
        second: 'Заголовок',
        thirth: 'Заголовок',
      },
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
          mask: '###-###-### ##',
          eager: true,
        },
      },
      position: null,
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
        snils: this.snils.bindedSnils.unmasked,
        position: this.position,
        tel: this.tel.bindedTel.masked,
        email: this.email,
      };
      const regexp = {
        firstName: /^[А-Я][а-яё]*$/,
        lastName: /^[А-Я][а-яё]*$/,
        patronymic: /^[А-Я][а-яё]*$/,
        snils: /^\d{3}-\d{3}-\d{3} \d{2}$/,
        position: /^[.+]*$/,
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
  },
};
</script>

<style>
.changeForm {
  display: flex;
  flex-direction: column;
}
</style>
