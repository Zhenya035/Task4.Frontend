import { ref } from 'vue';
import authApi from '@/api/api';
import { useRouter } from 'vue-router';
import router from "../../router/index.js";

export default function userAuthorization() {
    const formData = ref({
        email: '',
        password: '',
    });

    const loading = ref(false);
    const error = ref(null);

    const router = useRouter();

    const submitForm = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await authApi.login(formData.value);
            console.log('Успех:', response.data);
            const {userId, token} = response.data;

            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('token', token);

            await router.push('/users');
        } catch (err) {
            console.error('Ошибка регистрации', err);
            if (err.response?.status === 404) {
                error.value = 'Email or password is incorrect';
            } else {
                error.value = err.response?.data?.message || 'Authorization error';
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        formData,
        loading,
        error,
        submitForm,
    };
}