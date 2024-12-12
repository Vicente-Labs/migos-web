export type Language = 'en-US' | 'es-ES' | 'pt-BR'

export type PageProps<T = unknown> = {
  searchParams: Promise<{
    [key: string]: string
  }>
  params: Promise<
    {
      lang: Language
    } & T
  >
}
