#!/bin/bash

# Liste aller Komponenten, die in ui/ liegen
components=(AdminDashboard badge button card)

echo "🔧 Starte automatische Pfadkorrektur für UI-Komponenten..."

for comp in "${components[@]}"
do
  echo "➡️  Ersetze Importpfade für: $comp"
  grep -rl "components/$comp" . | xargs sed -i "s|components/$comp|components/ui/$comp|g"
done

echo "✅ Alle UI-Komponenten-Importe wurden auf 'components/ui/' korrigiert."
