# Generated by Django 5.0.7 on 2024-09-17 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='cook_time',
            field=models.CharField(default='00:00', max_length=10),
        ),
        migrations.AddField(
            model_name='recipe',
            name='prep_time',
            field=models.CharField(default='00:00', max_length=10),
        ),
        migrations.AlterField(
            model_name='recipe_ingredient',
            name='measurement',
            field=models.CharField(choices=[('GRAMS', 'g'), ('PIECES', 'pieces'), ('ML', 'ml'), ('CUPS', 'cups'), ('AMOUNT', 'amount'), ('TEASPOONS', 'teaspoons'), ('TABLESPOONS', 'tablespoons'), ('WHOLE', 'whole'), ('CANS', 'cans')], default='GRAMS', max_length=20),
        ),
    ]
