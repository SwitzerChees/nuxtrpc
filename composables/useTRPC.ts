export const useTRPC = () => {
  const { $client } = useNuxtApp()

  const isLoading = ({ status }: { status: Ref<string> }) => {
    return computed(() => status.value === 'pending')
  }

  const onSuccess = ({ status }: { status: Ref<string> }, successFunction: () => void) => {
    if (!successFunction) return
    watch(status, (newStatus) => {
      if (newStatus === 'success') {
        successFunction()
      }
    })
  }

  const onError = ({ status }: { status: Ref<string> }, errorFunction: () => void) => {
    if (!errorFunction) return
    watch(status, (newStatus) => {
      if (newStatus === 'error') {
        errorFunction()
      }
    })
  }

  return { trpc: $client, isLoading, onSuccess, onError }
}
