# vitest-design-diff

`vitest-design-diff` is a utility that captures screenshot of a given component and compares it with the design draft.
It returns the [SSIM](https://en.wikipedia.org/wiki/Structural_similarity_index_measure#:~:text=The%20structural%20similarity%20index%20measure,the%20similarity%20between%20two%20images.) (Structural Similarity Index Measure) and the number of differing pixels, enabling you to evaluate whether the implementation sufficiently matches the design specifications.

## Usage

```typescript jsx
import diff from 'vitest-design-diff';
import { expect, test } from 'vitest';

// Design draft
import basic from './designDrafts/basic.png';

// Component
import Basic from '../components/Basic';

test('Diff with design draft', async () => {
    const { ssim } = await diff({
        designDraft: basic,
        component: <Basic />,
    });

    expect(ssim).toBeGreaterThan(0.9);
});
```

## API

### diff

`(options: Options) => Promise<Result>`

```typescript
interface Options {
    /**
     * The path of design draft.
     */
    designDraft: string;
    /**
     * The component to be compared.
     */
    component: ReactNode;
    /**
     * The threshold of pixel diff between component screenshot and design draft.
     *
     * @default 0.1
     */
    diffThreshold?: number;
    /**
     * The diff result image path between component screenshot and design draft.
     */
    diffResultPath?: string;
    /**
     * A hook called before component screenshot. You can set global styles, load fonts or do some interaction here.
     */
    beforeScreenshot?: () => Promise<unknown> | unknown;
}
```

```typescript
interface Result {
    /**
     * The ssim (Structural Similarity Index Measure) result between component screenshot and design draft.
     *
     * @range [0, 1]
     */
    ssim: number;
    /**
     * The data URL of the diff result image.
     */
    diffResultSrc: string;
    /**
     * The number of different pixel between component screenshot and design draft.
     */
    diffPixelCount: number;
}
```
