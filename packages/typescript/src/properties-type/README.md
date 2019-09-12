# Properties

Properties export the utility type `Properties` Which extracts the properties from classes.

## Example

Given class `Foo`:

```typescript
class Foo {
  public bar: string;

  public bat(): void {}
}
```

`Properties<Foo>` would be equivilant to:

```typescript
interface PropertiesOfFoo {
  bar: string;
}
```
