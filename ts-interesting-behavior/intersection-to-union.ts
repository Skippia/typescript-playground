/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export {}

type _UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never

interface Format320 {
  urls: { format320p: string }
}
interface Format480 {
  urls: { format480p: string }
}
interface Format720 {
  urls: { format720p: string }
}
interface Format1080 {
  urls: { format1080p: string }
}

interface BasicVideoData {
  id: number
}

type Video = BasicVideoData & (Format320 | Format480 | Format720 | Format1080)

const video1: Video = {
  id: 20,
  urls: {
    format320p: 'https://...',
  },
}

// FormatKeys = never, but why?
/**
 * Since the Video type is a combination of all these types,
 * the urls key from each of the four types is being overridden by the next one,
 * so the final object will have only one key urls, but its value can be any of the four possible values
 * { format320p: string }, { format480p: string }, { format720p: string }, or { format1080p: string },
 * but never all of them, so the Video["urls"] will have the type of never
 */

type FormatKeysFromUnion = keyof Video['urls'] // never
type FormatKeysFromIntersection = keyof _UnionToIntersection<Video['urls']> // format320p | format480p | format 720p | format 1080p







/**
 * MUCH MORE DETAILED DESCRIPTION STEP BY STEP
 */


 type UnionToIntersection<T> =
 (T extends any ? (x: T) => any : never) extends
 (x: infer R) => any ? R : never

type Intersected1 = UnionToIntersection<Video["urls"]>

// equals to

type Intersected2 = UnionToIntersection<
 { format320p: string } |
 { format480p: string } |
 { format720p: string } |
 { format1080p: string }
>

// we have a naked type, this means we can do
// a union of conditionals:

type Intersected3 =
 UnionToIntersection<{ format320p: string }> |
 UnionToIntersection<{ format480p: string }> |
 UnionToIntersection<{ format720p: string }> |
 UnionToIntersection<{ format1080p: string }>

// expand it...

type Intersected4 =
 ({ format320p: string } extends any ?
   (x: { format320p: string }) => any : never) extends
   (x: infer R) => any ? R : never |
 ({ format480p: string } extends any ?
   (x: { format480p: string }) => any : never) extends
   (x: infer R) => any ? R : never |
 ({ format720p: string } extends any ?
   (x: { format720p: string }) => any : never) extends
   (x: infer R) => any ? R : never |
 ({ format1080p: string } extends any ?
   (x: { format1080p: string }) => any : never) extends
   (x: infer R) => any ? R : never

// conditional one!

type Intersected5 =
 (x: { format320p: string }) => any extends
   (x: infer R) => any ? R : never |
 (x: { format480p: string }) => any extends
   (x: infer R) => any ? R : never |
 (x: { format720p: string }) => any extends
   (x: infer R) => any ? R : never |
 (x: { format1080p: string }) => any extends
   (x: infer R) => any ? R : never

// conditional two!, inferring R!
type Intersected6 =
 { format320p: string } |
 { format480p: string } |
 { format720p: string } |
 { format1080p: string }

// But wait! `R` is inferred from a contra-variant position
// I have to make an intersection, otherwise I lose type compatibility

type Intersected7 =
 { format320p: string } &
 { format480p: string } &
 { format720p: string } &
 { format1080p: string }
