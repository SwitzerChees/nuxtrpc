export default defineNitroPlugin(async () => {
  const { connect } = useDrizzle()
  await connect()
  // await migration()
})
