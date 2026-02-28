# Claude 作業ルール

## Git ワークフロー

- 変更作業は必ずブランチを切ってから行う（main への直接コミット禁止）
- ブランチ名は用途に応じたプレフィックスをつける
  - 新機能: `feat/機能名` 例: `feat/export-png`
  - バグ修正: `fix/内容` 例: `fix/contrast-badge`
  - 設定・雑務: `chore/内容` 例: `chore/update-deps`
- 作業完了後はコミット → プッシュ → PR 作成まで行う（main へのマージはユーザーが行う）
- `git push --force` は禁止（ユーザーから明示的に指示された場合のみ可）
