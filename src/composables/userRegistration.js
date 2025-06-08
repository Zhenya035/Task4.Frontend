import { ref } from 'vue';
import authApi from '@/api/api';
import { useRouter } from 'vue-router';

export default function userRegistration() {
    const formData = ref({
        name: '',
        email: '',
        password: ''
    });

    const loading = ref(false);
    const error = ref(null);

    const router = useRouter();

    const submitForm = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await authApi.register(formData.value);
            console.log('Успех:', response.data);

            const {userId, token} = response.data;

            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('token', token);

            await router.push('/users');
        } catch (err) {
            console.error('Ошибка регистрации', err);
            error.value = err.response?.data?.message || 'Email alredy used';
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