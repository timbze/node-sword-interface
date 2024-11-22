declare module 'node-sword-interface' {
  export type ModuleType = 'BIBLE' | 'DICT' | 'COMMENTARY'
  export type SearchType = 'phrase' | 'multiWord' | 'strongsNumber'
  export type SearchScope = 'BIBLE' | 'OT' | 'NT'

  export interface VerseObject {
    moduleCode: string
    bibleBookShortTitle: string
    chapter: string
    verseNr: string
    absoluteVerseNr: number
    content: string
  }

  export interface ModuleObject {
    name: string
    type: string
    description: string
    language: string
    distributionLicense: string
    shortCopyright: string
    version: string
    lastUpdate: string
    category: string
    repository: string
    about: string
    abbreviation: string
    size: number
    location: string
    unlockInfo: string
    inUserDir: boolean
    locked: boolean
    hasStrongs: boolean
    hasGreekStrongsKeys: boolean
    hasHebrewStrongsKeys: boolean
    hasFootnotes: boolean
    hasHeadings: boolean
    hasRedLetterWords: boolean
    hasCrossReferences: boolean
    isRightToLeft: boolean
  }

  export interface StrongsReference {
    text: string
    key: string
  }

  export interface StrongsEntry {
    rawEntry: string
    key: string
    transcription: string
    phoneticTranscription: string
    definition: string
    references: StrongsReference[]
  }

  export interface ProgressCallback {
    (progress: number): void
  }

  export default class NodeSwordInterface {
    constructor(customHomeDir?: string)

    repositoryConfigExisting(): boolean
    
    updateRepositoryConfig(progressCB?: ProgressCallback): Promise<Record<string, any>>
    
    getRepoNames(): string[]
    
    getRepoLanguages(repositoryName: string, moduleType?: ModuleType): string[]
    
    getAllRepoModules(repositoryName: string, moduleType?: ModuleType): ModuleObject[]
    
    getRepoModulesByLang(
      repositoryName: string,
      language: string,
      moduleType?: ModuleType,
      headersFilter?: boolean,
      strongsFilter?: boolean,
      hebrewStrongsKeys?: boolean,
      greekStrongsKeys?: boolean
    ): ModuleObject[]
    
    getUpdatedRepoModules(repositoryName?: string, includeBeta?: boolean): ModuleObject[]
    
    getRepoModule(moduleCode: string): ModuleObject
    
    getAllLocalModules(moduleType?: ModuleType): ModuleObject[]
    
    getRepoModuleCount(repositoryName: string, moduleType?: ModuleType): number
    
    getRepoLanguageModuleCount(
      repositoryName: string,
      language: string,
      moduleType?: ModuleType
    ): number
    
    installModule(moduleCode: string, progressCB?: ProgressCallback): Promise<void>
    
    cancelInstallation(): void
    
    uninstallModule(moduleCode: string): Promise<void>
    
    refreshLocalModules(): void
    
    saveModuleUnlockKey(moduleCode: string, key: string): void
    
    isModuleReadable(moduleCode: string): boolean
    
    getModuleDescription(moduleCode: string): string
    
    enableMarkup(): void
    
    getRawModuleEntry(moduleCode: string, key: string): string | undefined
    
    getReferenceText(moduleCode: string, key: string): VerseObject
    
    getChapterText(moduleCode: string, bookCode: string, chapter: number): VerseObject[]
    
    getBookText(
      moduleCode: string,
      bookCode: string,
      startVerseNr?: number,
      verseCount?: number
    ): VerseObject[]
    
    getVersesFromReferences(moduleCode: string, references: string[]): VerseObject[]
    
    getReferencesFromReferenceRange(referenceRange: string): string[]
    
    getBookList(moduleCode: string): string[]
    
    getBookHeaderList(
      moduleCode: string,
      bookCode: string,
      startVerseNumber: number,
      verseCount: number
    ): VerseObject[]
    
    getBookChapterCount(moduleCode: string, bookCode: string): number
    
    getChapterVerseCount(moduleCode: string, bookCode: string, chapter: number): number
    
    getAllChapterVerseCounts(moduleCode: string, bookCode: string): number[]
    
    getBookVerseCount(moduleCode: string, bookCode: string): number
    
    getBibleText(moduleCode: string): VerseObject[]
    
    getBookIntroduction(moduleCode: string, bookCode: string): string
    
    moduleHasBook(moduleCode: string, bookCode: string): boolean
    
    getDictModuleKeys(moduleCode: string): string[]
    
    getModuleSearchResults(
      moduleCode: string,
      searchTerm: string,
      progressCB?: ProgressCallback,
      searchType?: SearchType,
      searchScope?: SearchScope,
      isCaseSensitive?: boolean,
      useExtendedVerseBoundaries?: boolean
    ): Promise<VerseObject[]>
    
    terminateModuleSearch(): void
    
    hebrewStrongsAvailable(): boolean
    
    greekStrongsAvailable(): boolean
    
    strongsAvailable(): boolean
    
    getStrongsEntry(strongsKey: string): StrongsEntry
    
    getLocalModule(moduleCode: string): ModuleObject | undefined
    
    isModuleInUserDir(moduleCode: string): boolean
    
    isModuleAvailableInRepo(moduleCode: string): boolean
    
    getSwordTranslation(originalString: string, localeCode: string): string
    
    getBookAbbreviation(moduleName: string, bookCode: string, localeCode: string): string
    
    getSwordVersion(): string
    
    getSwordPath(): string
  }
} 